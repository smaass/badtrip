$(function() {

  //populate preset selector
  var presetSelector = $("#vizEditPreSel");
  presetSelector.empty();
  _.each(VIZ.presets, function(p, i) {
    presetSelector.append('<option value="' + p + '">' + p + '</option>');
  });

  //Preset controls
  $("#vizEditPreSel")
  .change(function () {
    var preSelected = $(this).find(":selected").val();

    VIZ.updatePreset(preSelected);

    //$("#vizEditSel").change(); //to load the text of the new preset
    this.blur();

  });

  var cyclePresets = true;
  $("#vizPresetCycle")
  .change(function () {
    cyclePresets = $(this).is(':checked');

    this.blur();
  });

  var presetCycle = function(val){
    if(val || (cyclePresets && !VIZ.getPause())) {
      $("#vizEditPreSel")
      .val(VIZ.presets[Math.floor(Math.random() * VIZ.presets.length)])
      .change();
    }
  };

  presetCycle(true);
  setInterval(presetCycle,22.5*1000);

  var presetToggle = function(event){

    if( event.which !== 37 &&  event.which !== 39 )	return;

    if($(".CodeMirror-focused").length == 0) {
      var offset = event.which  == 37 ? -1 : 1;

      var sel = document.getElementById("vizEditPreSel");

      sel.selectedIndex = (sel.selectedIndex + offset + sel.options.length) % sel.options.length;

      $("#vizEditPreSel").change();
    }
  };
  document.addEventListener('keydown', presetToggle, false);


  $("#vizMeshResizeSel")
  .change(function () {
    var meshSize = parseInt($(this).find(":selected").val());

    VIZ.resizeMesh(meshSize,meshSize);

    this.blur();

  });

  $("#vizRenderResizeSel")
  .change(function () {
    var renderSize = parseInt($(this).find(":selected").val());

    VIZ.resizeTextures(renderSize,renderSize);

    this.blur();

  });

  //

  var canvasWrapper = $("#canvaswrapper");
  VIZ.initViz(canvasWrapper);

  //

  var width = 800;
  var height = 600;

  // Fullscreen
  if( THREEx.FullScreen.available() ){
    THREEx.FullScreen.bindKey({element : $("#canvaswrapper canvas")[0],
                               dblclick : true});


    var toggleRSize = function() {

      if( THREEx.FullScreen.activated() ){
        VIZ.setRendererSize(window.screen.availWidth, window.screen.availHeight);
      }
      else{
        VIZ.setRendererSize(width,height);
      }
      return null;
    };

    $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange',toggleRSize);
  }

  // Maximize in window
  var maxToggle = function(event){
    if( event.which !== 109 )	return;

    if($(".CodeMirror-focused").length == 0) {

      var mainWrapper = $("#mainWrapper");
      var container = $("#container");

      if(mainWrapper.css('display') == "none") {
        canvasWrapper.appendTo(container);
        canvasWrapper.css('margin', "auto");
        canvasWrapper.css('width',width);
        mainWrapper.css('display', "block");
        VIZ.setRendererSize(width,height);
      }
      else {
        mainWrapper.css('display', "none");
        canvasWrapper.appendTo($("body"));
        canvasWrapper.css('margin', "initial");
        canvasWrapper.css('width',window.innerWidth);
        VIZ.setRendererSize(window.innerWidth, window.innerHeight);
      }

    }
  };
  document.addEventListener('keypress', maxToggle, false);

  // Resize renderer if it is maximized and the window is resized
  window.addEventListener('resize', _.debounce(
    function(event) {
      var mainWrapper = $("#mainWrapper");
      if(mainWrapper.css('display') == "none") {
        canvasWrapper.css('width',window.innerWidth);
        VIZ.setRendererSize(window.innerWidth, window.innerHeight);
      }
    }, 500, false));

  //

  var audioNode;
  var context;
  var delayedAudible;
  var sourceNode;
  var buffer;
  var mediaStreamSource;
  var playlist = [];
  var loading = false;
  var paused = true;
  var pausedAt = null;
  var startedAt = null;
  var waitingToPlay = true;
  var playbackTimer = null;

  String.prototype.hashCode = function(){
    var hash = 0, i, char;
    if (this.length == 0) return hash;
    for (i = 0, l = this.length; i < l; i++) {
      char  = this.charCodeAt(i);
      hash  = ((hash<<5)-hash)+char;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };

  function renderPlaylist() {
    var playlistDOM = $("#playlist");
    playlistDOM.empty();

    for(var i = 0; i < playlist.length; i++) {
      if(i == 0) {
        playlistDOM.append($('<li class="playing">' + playlist[i].name +'</li>'));
      }
      else {
        playlistDOM.append($('<li>' + playlist[i].name +'</li>'));
      }
    }

    var playlistHeight = $("#playlist").innerHeight();
    playlistHeight = (playlistHeight > 300) ? 300 : playlistHeight;
    $("#innerPlaylistWrapper").css('top',"-" + playlistHeight + "px");
  }

  function loadNextTrack() {
    if(playlist.length > 0) {

      var track = playlist[0];

      if(track.type == "local") {
        var file = track.src;
        var reader = new FileReader();

        reader.onload = function (event) {

          loading = true;
          pausedAt = null;

          context.decodeAudioData(
            event.target.result,
            function(buf) {
              buffer = buf;
              createSourceNode();
              loading = false;
            },
            function(error) {
            }
          );

        };

        reader.readAsArrayBuffer(file);
      }
      else if(track.type == "soundcloud") {
        createAudioNode(track.src);
      }

      renderPlaylist();
    }
  }

  function setProgressBar(x) {
    var newcss = $("#trackProgress").css('background-image').split("(")[0] + "(left, orange " + x + "%, white " + x + "%)";
    $("#trackProgress").css('background-image',newcss);
  }

  function clearCurrTrack() {

    if(playlist.length > 0) {
      var track = playlist[0];

      if(track.type == "local") {
        if(!paused) pauseBufferSource();
      }
      else if(track.type == "soundcloud") {
        audioNode.pause();
        $(audioNode).remove();
      }
    }

    playlist.shift();
    pausedAt = null;
    startedAt = null;
    loadNextTrack();
    if(playlist.length == 0) {
      renderPlaylist();
      paused = true;
      VIZ.setPause(true);
      waitingToPlay = true;
    }
  }

  function connectToAudioAnalyzer(sourceNode) {

    if(delayedAudible) delayedAudible.disconnect();

    delayedAudible = context.createDelay();
    //delayedAudible.delayTime.value = analyser.fftSize * 2 / context.sampleRate; //FFT lag
    delayedAudible.delayTime.value = 0.26; //Experimentally this feels better

    sourceNode.connect(delayedAudible)
    delayedAudible.connect(context.destination);

    VIZ.connectAudio(delayedAudible);
  }

  function setAudioDelay(d) {

    console.log("Setting delay: " + d);

    delayedAudible.delayTime.value = d;
  }

  function playBufferSource() {
    paused = false;
    VIZ.setPause(false);

    sourceNode = context.createBufferSource();
    sourceNode.buffer = buffer;
    connectToAudioAnalyzer(sourceNode);

    var timerTimeout;

    if(pausedAt) {

      timerTimeout = buffer.duration * 1000 - pausedAt;

      startedAt = Date.now() - pausedAt;
      sourceNode.start(0, pausedAt / 1000, timerTimeout / 1000);
    }
    else {
      startedAt = Date.now();
      sourceNode.start(0);

      timerTimeout = buffer.duration * 1000;
    }

    $("#playPauseBut").text("Pause");

    playbackTimer = setTimeout(function() {
      clearCurrTrack();
    }, timerTimeout );
  }

  function pauseBufferSource() {
    paused = true;
    VIZ.setPause(true);

    if(sourceNode) {
      sourceNode.stop(0);
      sourceNode.disconnect();
      pausedAt = Date.now() - startedAt;

      $("#playPauseBut").text("Play");

      clearTimeout(playbackTimer);
    }
  }

  function createSourceNode() {
    paused = true;
    VIZ.setPause(true);
    if (sourceNode) sourceNode.disconnect();

    playBufferSource();
  }

  navigator.getUserMedia = (navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia ||
                            navigator.msGetUserMedia);

  var assets = {
    rythm: 0,
    matrix: 0,
    spatialized: 0,
    allLoaded: function () {
      return this.rythm != 0 && this.matrix != 0;
    },
    load: function (callback) {
      this.callback = callback;
      this.loadAsset("./impulse-rhythm2.wav", "rythm");
      this.loadAsset("./matrix6-backwards.wav", "matrix");
      this.loadAsset("./spatialized5.wav", "spatialized");
    },
    loadAsset: function (url, asset) {
      // Load asynchronously
      var request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.responseType = "arraybuffer";
      this.request = request;
      
      request.onload = function() {
          context.decodeAudioData(
              request.response,
              function(buffer) {
                assets[asset] = buffer;
                if (assets.allLoaded()) {
                  assets.callback();
                }
              },
              function(buffer) {
                // alert("ERROR!!!!! " + asset.url);
              }
          );
      }
      request.send();
    }
  }

  var convolver1;
  var convolver2;
  var convolver3;

  var onStream = function(stream) {
    var input = context.createMediaStreamSource(stream);

    // Convolution
    convolver1 = context.createConvolver();
    convolver2 = context.createConvolver();
    convolver3 = context.createConvolver();

    var gainNode1 = context.createGain();
    var gainNode2 = context.createGain();
    var gainNode3 = context.createGain();
    var endNode = context.createGain();
    gainNode1.gain.value = 2.5;
    gainNode2.gain.value = 1.5;
    gainNode3.gain.value = 2.0;
    endNode.gain.value = 1.0;

    input.connect(convolver1);
    convolver1.connect(gainNode1);
    gainNode1.connect(endNode);

    input.connect(convolver2);
    convolver2.connect(gainNode2);
    gainNode2.connect(endNode);

    input.connect(convolver3);
    convolver3.connect(gainNode3);
    gainNode3.connect(endNode);

    assets.load(function () {
      convolver1.buffer = assets.rythm;
      convolver2.buffer = assets.spatialized;
      convolver3.buffer = assets.matrix;
    });

    connectToAudioAnalyzer(endNode);
  };

  var onStreamError = function(e) {
    console.error('Error getting microphone', e);
  };

  var getMicrophoneInput = function() {
    navigator.getUserMedia({audio: true},
                            onStream.bind(this),
                            onStreamError.bind(this));
  };

  function createAudioNode(src) {

    paused = true;
    VIZ.setPause(true);
    if (audioNode) $(audioNode).remove();
    if (sourceNode) sourceNode.disconnect();

    audioNode = new Audio();
    audioNode.src = src;
    audioNode.addEventListener("pause", function() {
      paused = true;
      VIZ.setPause(true);
      $("#playPauseBut").text("Play");
    });
    audioNode.addEventListener("play",  function() {
      paused = false;
      VIZ.setPause(false);
      $("#playPauseBut").text("Pause");
    });
    audioNode.addEventListener("canplay", function(e) {
      console.log(audioNode);
      sourceNode = context.createMediaElementSource(audioNode);
      console.log(sourceNode);
      connectToAudioAnalyzer(sourceNode);

      startedAt = Date.now(); //because some parts of the code check for this
      audioNode.play();

      audioNode.addEventListener('ended', function(){
        clearCurrTrack();
      }, false);

    }, false);

  }

  function loadFile(fURL) {
    console.log("LOADING: " + fURL);

    var urlSplit = fURL.split("/");
    var songName = urlSplit[urlSplit.length-1].split(".")[0]

    playlist.push({src : fURL,
                   name: songName,
                   type: "server"});

    renderPlaylist();

    if($("#playerAudio")[0].ended ||
       $("#playerAudio")[0].played.length == 0) {
      loadNextTrack();
    }
  }

  function addSoundCloudTrack(trackID) {
    playlist.push({src : 'http://api.soundcloud.com/tracks/' + trackID + '/stream?client_id=9c8b6312417527b0a987904b28e6bdba',
                   name: "Doctor Who (Dubstep Remix) by SP3CtruM",
                   type: "soundcloud"});

    renderPlaylist();

    if(waitingToPlay) {
      waitingToPlay = false;
      loadNextTrack();
    }
  }
  window.addSCT = addSoundCloudTrack;

  function playToggle() {
    if(!loading && startedAt && !waitingToPlay && $(".CodeMirror-focused").length == 0) {

      if(playlist.length > 0) {
        var track = playlist[0];

        if(track.type == "local") {
          if(paused) {
            playBufferSource();
          }
          else {
            pauseBufferSource();
          }
        }
        else if(track.type == "soundcloud") {
          if(paused) {
            audioNode.play();
          }
          else {
            audioNode.pause();
          }
        }
      }
    }
  }

  function initPlayer() {
    try {
      if(typeof webkitAudioContext === 'function' ||
         'webkitAudioContext' in window) {
        context = new webkitAudioContext();
      }
      else {
        context = new AudioContext();
      }
    }
    catch(e) {
      return false;
    }

    VIZ.initAudio(context);

    // Click Handlers

    //playlist
    $("#playlistBut").click(function() {
      $("#innerPlaylistWrapper").toggleClass("hidden");

      var playlistHeight = $("#playlist").innerHeight();
      playlistHeight = (playlistHeight > 300) ? 300 : playlistHeight;
      $("#innerPlaylistWrapper").css('top',"-" + playlistHeight + "px");
    });

    //settings
    $("#settingsBut").click(function() {
      $("#innerSettingsWrapper").toggleClass("hidden");

      var settingsHeight = $("#settings").innerHeight();
      $("#innerSettingsWrapper").css('top',"-" + settingsHeight + "px");
    });

    //progress bar
    $("#trackProgress").click(function(ev) {
      if(!loading && startedAt && !waitingToPlay) {

        var eventOffset = (ev.offsetX || ev.clientX - $(ev.target).offset().left);
        var clickPerc = eventOffset / this.offsetWidth;
        // correct for borders
        var borderwidth = $("#trackProgress").css("border-left-width").split("px")[0];
        clickPerc += (clickPerc < .5 ? -1 : 1)*Math.abs(clickPerc - .5) / .5 * (borderwidth / this.offsetWidth);
        setProgressBar(clickPerc*100);


        if(playlist.length > 0) {
          var track = playlist[0];

          if(track.type == "local") {
            pauseBufferSource();
            pausedAt = buffer.duration * clickPerc * 1000;
            playBufferSource();
          }
          else if(track.type == "soundcloud") {
            audioNode.currentTime = audioNode.duration * clickPerc;
          }
        }

      }
    });

    setInterval(function() {
      if(!paused) {
        if(playlist.length > 0) {
          var track = playlist[0];

          if(track.type == "local") {
            var playPerc = (Date.now() - startedAt) / (buffer.duration * 1000);
            setProgressBar( playPerc * 100 );
          }
          else if(track.type == "soundcloud") {
            var playPerc = audioNode.currentTime / audioNode.duration;
            setProgressBar( playPerc * 100 );
          }
        }
      }
    }, 1000);

    //play
    $("#playPauseBut").click(function(event) {
      playToggle();
    });

    //next
    $("#nextTrackBut").click(function(event) {
      if(playlist.length > 0 && !loading && startedAt && !waitingToPlay) {
        clearTimeout(playbackTimer);
        clearCurrTrack();
      }
    });

    //play/pause using 's' key
    document.addEventListener('keypress',
                              function(event) {
                                if( event.which !== 115 )	return;

                                playToggle();
                              },
                              false);

    function loadLocalFiles(files) {
      for(var i = 0; i < files.length; i++) {
        var file = files[i];
        var fileExt = file.name.split('.').pop();
        var fname = file.name.split("." + fileExt)[0];
        playlist.push({src : file,
                       name: fname,
                       type: "local"});

      }

      renderPlaylist();

      if(waitingToPlay) {
        waitingToPlay = false;
        loadNextTrack();
      }
    }

    //Drag tracks onto the page
    _.each([document.getElementById('mainWrapper'),
            document.getElementById('canvaswrapper')],
           function(elm, ind, elms) {

             elm.ondragover = function () {
               _.each(elms, function(elmi) {
                 elmi.className = 'fileDrag';
               });
               return false;
             };
             elm.ondragend = function () {
               _.each(elms, function(elmi) {
                 elmi.className = '';
               });
               return false;
             };

             elm.ondrop = function (e) {
               // Turn off all hover modes because we don't bubble events up
               _.each(elms, function(elmi) { elmi.className = ''; });
               e.preventDefault();
               e.stopPropagation()

               loadLocalFiles(e.dataTransfer.files);

             };
           });

    $(".initBottomOpacity").hover(function() { $(this).removeClass("initBottomOpacity") });


    if(!window.chrome) {
      $("#SCstreambut").addClass('hidden');
      $("#demoORText").addClass('hidden');
    }

    $("#SCstreambut").click(function() {
      if(!window.chrome) {
        alert("This feature currently only works in Chrome");
      }
      else {
        addSoundCloudTrack('21341315');
      }
    });

    $("#microphone").click(function () {
      console.log("microphone!");
      getMicrophoneInput();
    });


    $("#localFileBut").click(function() {
      var fileSelector = $('<input type="file" accept="audio/*" multiple />');

      fileSelector[0].onchange = function(event) {
        var fileList = fileSelector[0].files;
        loadLocalFiles(fileList);
      }

      fileSelector.click();
    });

    return true;
  }

  initPlayer();
});
