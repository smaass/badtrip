$(function() {

  function Preset (name, minDuration, maxDuration) {
    this.name = name;
    this.minDuration = minDuration;
    this.maxDuration = maxDuration;
  }

  var presets = [
    new Preset("Geiss - Reaction Diffusion 2", 3, 10),
    new Preset("Geiss - Reaction Diffusion 3 (Lichen Mix)", 3, 10),
    //new Preset("geiss - reaction diffusion 3 (rippling leopard skin)", 3, 10),
    //new Preset("Bmelgren + Krash - Rainbow Orb Peacock (Centred Journey Mix 2)", 3, 10),
    new Preset("Che - Terracarbon Stream", 3, 10),
    new Preset("cope + flexi - mother-of-whirl [no fnords were hurt]", 3, 10),
    new Preset("cope + martin - mother-of-pearl", 3, 10),
    //new Preset("cope - alternative energy (antimatter mod_1)4z", 3, 10),
    //new Preset("cope - the drain to heaven", 3, 10),
    new Preset("Cope - The Neverending Explosion of Red Liquid Fire", 3, 10),
    new Preset("cope, martin + flexi - the slickery of alternative varnish", 3, 10),
    new Preset("Eo.S.+Phat - detached centerpoint", 3, 10),
    new Preset("Flexi + geiss - the deep diver′s manifesto [metaphorfree]", 3, 10),
    new Preset("Flexi + Martin - cascading decay swing", 3, 10),
    new Preset("Flexi + stahlregen - jelly showoff parade", 3, 10),
    new Preset("Flexi - age of shading chaos", 3, 10),
    new Preset("flexi - julia island [output stage]", 3, 10),
    new Preset("flexi - julia set illuminating example [parameter play]", 3, 10),
    new Preset("flexi - julia set illuminating example", 3, 10),
    new Preset("flexi - lollipop overkill [bccn Jelly V4]", 3, 10),
    new Preset("Flexi - predator-prey-spirals [geiss′ laplacian finish]", 3, 10),
    new Preset("Flexi - predator-prey-spirals [stahlregens gelatine finish]", 3, 10),
    new Preset("Flexi - psychenapping", 3, 10),
    new Preset("flexi - swing out on the spiral", 3, 10),
    new Preset("flexi - undercurrents 3 [geiss bipolar 1 mix] (Jelly 5.5)", 3, 10),
    new Preset("Flexi, martin + geiss - dedicated to the sherwin maxawow", 3, 10),
    //new Preset("Geiss + Rovastar - Tokamak (Naked Intrusion Mix)", 3, 10),
    //new Preset("Geiss - Artifact 6b", 3, 10),
    //new Preset("Geiss - Artifact 6d", 3, 10),
    //new Preset("Geiss - Artifact Plasma 2", 3, 10),
    //new Preset("Geiss - Artifact Plasma", 3, 10),
    //new Preset("Geiss - Bas Relief", 3, 10),
    //new Preset("Geiss - Bass Zoom", 3, 10),
    //new Preset("Geiss - Bas Relief - mash0000 - restructure society one sheep at a time", 3, 10),
    //new Preset("Geiss - Cartographie", 3, 10),
    //new Preset("Geiss - Cauldron - painterly (saturation remix)", 3, 10),
    //new Preset("Geiss - Cauldron - painterly 5 (saturation remix)", 3, 10),
    //new Preset("Geiss - Cauldron - painterly 5", 3, 10),
    //new Preset("Geiss - Cauldron - painterly", 3, 10),
    //new Preset("Geiss - Cosmic Dust 2 - quasistatic noise dual pane window", 3, 10),
    //new Preset("Geiss - Dancing Spirits (Bright)", 3, 10),
    //new Preset("Geiss - Dancing Spirits", 3, 10),
    //new Preset("Geiss - Four Kinds of Amphetamines", 3, 10),
    //new Preset("Geiss - Iris Storm", 3, 10),
    new Preset("Geiss - Liquid Beats (janky ripple warp reflecto)", 3, 10),
    new Preset("geiss - liquid beats (jelly v4.5)", 3, 10),
    new Preset("Geiss - Liquid Beats 2 (Reverse Jelly V3)", 3, 10),
    //new Preset("Geiss - Mash-Up 4", 3, 10),
    //new Preset("Geiss - Mega Swirl 3 (color tweak)", 3, 10),
    new Preset("Geiss - Motion Blur 2 (Stahl′s Neon Jelly 2 RMX)", 3, 10),
    new Preset("Geiss - Octopus", 3, 10),
    new Preset("Geiss - Rose 4 (LSB mix)", 3, 10),
    new Preset("Geiss - Skin Dots Multi-layer 3", 3, 10),
    new Preset("Geiss - Sound And The Fury (Jelly V3)", 3, 10),
    new Preset("Geiss - Thumb Drum", 3, 10),
    new Preset("Geiss, Flexi + Stahlregen - Thumbdrum Tokamak [crossfiring aftermath jelly mashup]", 3, 10),
    //new Preset("Hexcollie - Meatball", 3, 10),
    new Preset("Hexcollie, Aderassi, BDRV, AdamFX n Flexi - It′s a start", 3, 10),
    new Preset("Hexcollie, Bdrv, Geiss, Flexi n Aderrasi - Slime Slide - mash0000 - holster your salad shot", 3, 10),
    new Preset("Idiot - Marphets Surreal Dream (Hypnotic Spiral Mix)", 3, 10),
    new Preset("Idiot - Subnormal Trance (Remix)", 3, 10),
    //new Preset("Illusion & Boz - Hot Air Balloon", 3, 10),
    new Preset("Illusion & Unchained - New Strategy", 3, 10),
    new Preset("Ishan - Anuera", 3, 10),
    new Preset("Krash & Rovastar - A Million Miles from Earth (Ripple Mix)", 3, 10),
    new Preset("Jim & Geiss - Bass Zoom Symmetry - mash0000 - the god damn pen is rrrroyal blue", 3, 10),
    new Preset("Krash + Illusion + Geiss - Spiral Movement (Reaction Diffusion mix)", 3, 10),
    //new Preset("Krash + Rovastar - Rainbow Orb 2 Peacock (Bmelgren′s Compelling Vision)", 3, 10),
    //new Preset("Krash + Rovastar - Rainbow Orb", 3, 10),
    new Preset("Krash - Snowflake Halo", 3, 10),
    //new Preset("LuxXx - God is in the Radio v..6", 3, 10),
    new Preset("LuxXx - Hurty Soul I", 3, 10),
    new Preset("Mstress + Zylot - Acid UFO", 3, 10),
    //new Preset("nil - Vortex of Vortices", 3, 10),
    new Preset("Phat + Zylot + Eo.S. - work with lines", 3, 10),
    new Preset("Phat_Rovastar_Eo.S. square_faces_v2", 3, 10),
    new Preset("Phat_Zylot_Eo.S. spiral_Movements_Beatle", 3, 10),
    new Preset("Phat_Zylot_Eo.S. spiral_Movements_Beatle_square.mix", 3, 10),
    new Preset("Phat_Zylot_Eo.S._Krash I_hope_someone_will_see_this_triping_v2b", 3, 10),
    new Preset("Reenen - phoenix", 3, 10),
    new Preset("Rocke - Answer.42 (New Mix 1) - mash0000 - slash and char p. jungle", 3, 10),
    new Preset("Rovastar & Che - Definitly Not For The Epileptic (Inner Perspective Of Life Mix)", 3, 10),
    new Preset("Rovastar & Unchained - Ambrosia Mystic (Dark Heart Mix)", 3, 10),
    new Preset("Rovastar & Unchained - Demonology (Vampire Soul Mix)", 3, 10),
    new Preset("Rovastar + Che - Asylum Animations", 3, 10),
    new Preset("Rovastar + Flexi - Hurricane Nightmare (Moebius Mix)", 3, 10),
    new Preset("Rovastar + Geiss - Hyperkaleidoscope Glow 2 motion blur (Jelly)", 3, 10),
    new Preset("Rovastar + Geiss - Snapshot Of Space (LSB mix)", 3, 10),
    new Preset("Rovastar + Telek - Altars of Madness (Rolling Oceans Mix)", 3, 10),
    new Preset("Rovastar + Unchained - Ambrosia Mystic (Dark Heart Mix)", 3, 10),
    new Preset("Rovastar + Unchained - Oddball World", 3, 10),
    new Preset("Rovastar + Unchained - Voodoo Chess Magnet (Everglow Mix)", 3, 10),
    new Preset("Rovastar + Unchained - Xen Traffic", 3, 10),
    new Preset("Rovastar + Zylot - Narell′s Fever", 3, 10),
    new Preset("Rovastar + Zylot - Urza′s Revenge", 3, 10),
    new Preset("Rovastar - A Million Miles From Earth (Wormhole Mix)", 3, 10),
    new Preset("Rovastar - Altars Of Harlequin′s Madness", 3, 10),
    new Preset("Rovastar - Altars Of Madness 4 (Spirit Of Twisted Madness Mix)", 3, 10),
    new Preset("Rovastar - Fractopia (Fantic Dancing Lights Mix)", 3, 10),
    new Preset("Rovastar - Fractopia (Galaxy Swirl Mix)", 3, 10),
    new Preset("Rovastar - Fractopia (Upspoken Mix)", 3, 10),
    new Preset("Rovastar - Harlequin′s & Jester′s Dual Delight (Chaotic Nightmare Mix)", 3, 10),
    new Preset("Rovastar - Harlequin′s Dynamic Fractal 3", 3, 10),
    new Preset("Rovastar - Harlequin′s Fractal Encounter", 3, 10),
    new Preset("Rovastar - Harlequin′s Liquid Dragon", 3, 10),
    new Preset("Rovastar - Jester′s Surreal Tornado (Further Vortex Mix)", 3, 10),
    new Preset("Rovastar - Jester′s Surreal Tornado", 3, 10),
    new Preset("Rovastar - Oozing Resistance", 3, 10),
    new Preset("Rovastar - Solarized Space", 3, 10),
    new Preset("Rovastar - Torrid Tales", 3, 10),
    new Preset("Rovastar - Trippy Sperm (Jelly)", 3, 10),
    new Preset("Rovastar - VooV′s Light Pattern", 3, 10),
    new Preset("Rovastar - Xtal", 3, 10),
    new Preset("Rovastar&StudioMusic-MoreCherish", 3, 10),
    new Preset("Rozzor & Aderrasi - Canon", 3, 10),
    new Preset("Rozzor & Che - Inside The House Of Nil", 3, 10),
    new Preset("Rozzor & Unchained - Crescat Scientia, Vita Excolatur", 3, 10),
    //new Preset("Rozzor + Idiot - Any Other Deep Rising", 3, 10),
    new Preset("Rozzor - Learning Curve (Invert Tweak)", 3, 10),
    new Preset("Stahlregen & flexi + Geiss + martin + Rovastar - Tides (martin′s metallics)", 3, 10),
    new Preset("Stahlregen & Geiss + Eo.S + Martin + Rovastar - Halcyon Jelly Skin", 3, 10),
    new Preset("Stahlregen & Geiss + Rovastar - Fields of Flowers (distorted)", 3, 10),
    new Preset("Stahlregen & Geiss + TobiasWolfBoi - Space Gelatin (Color Xplosion 2)", 3, 10),
    new Preset("Stahlregen & Geiss - MashUp 16 (Seizure-Inducing Confetti Kaleidoscope RMX)", 3, 10),
    new Preset("Telek - Slow Thing (Spiderman Mix)", 3, 10),
    new Preset("Unchained & Rovastar - Luckless", 3, 10),
    new Preset("Unchained & Rovastar - Wormhole Pillars (Hall of Shadows mix)", 3, 10),
    new Preset("Unchained + Geiss - Furious Spirals (Blur and Glow Remix)", 3, 10),
    new Preset("Unchained + Geiss - Furious Spirals (Canvas Mix)", 3, 10),
    new Preset("Unchained - Beat Demo (Demonology Mix)", 3, 10),
    new Preset("Unchained - Cartoon Factory", 3, 10),
    new Preset("Unchained - Cranked On Failure", 3, 10),
    //new Preset("Unchained - Demonology", 3, 10),
    new Preset("Unchained - Morat′s Final Voyage", 3, 10),
    new Preset("Unchained - Not As Fun As It Looks", 3, 10),
    new Preset("Unchained - Picture Of Poison", 3, 10),
    new Preset("Unchained - Rewop", 3, 10),
    new Preset("Unchained - Subjective Experience Of The Manifold", 3, 10),
    new Preset("Unchained - Unclaimed Wreckage 2 (Sub-Spinal Daemon)", 3, 10),
    new Preset("yin - 100 - Through the ether - Bitcore Tweak", 3, 10),
    new Preset("yin - 191 - Temporal singularities",31,105)
  ];

  var currentPreset = 0;

  //VIZ.updatePreset(presets[0].name);

  var randomPreset = function () {
    var index = Math.floor(Math.random() * presets.length);
    return presets[index];
  }

  var setNextRandomPreset = function () {
    var preset = randomPreset();
    VIZ.updatePreset(preset.name);
    var seconds = Math.floor(Math.random() * (preset.maxDuration - preset.minDuration) + preset.minDuration);
    setTimeout(setNextRandomPreset, seconds * 1000);
  }

  var nextPreset = function () {
    if (currentPreset < presets.length - 1) {
      VIZ.updatePreset(presets[++currentPreset].name);
      console.log(presets[currentPreset].name);
    }
  }

  var previousPreset = function () {
    if (currentPreset > 0) {
      VIZ.updatePreset(presets[--currentPreset].name);
      console.log(presets[currentPreset].name);
    }
  }

  var canvasWrapper = $("#canvaswrapper");

  var maxToggle = function () {
    if(canvasWrapper.css('position') == 'absolute') {
      canvasWrapper.css({
        position: 'relative',
        width: width
      });
      VIZ.setRendererSize(width,height);
    }
    else {
      canvasWrapper.css({
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.innerWidth
      });
      VIZ.setRendererSize(window.innerWidth, window.innerHeight);
    }
  };

  $(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
          previousPreset();
        break;

        case 39: // right
          nextPreset();
        break;

        case 77: // m
          maxToggle();
    }
  });

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
  VIZ.initViz(canvasWrapper);

  //

  var width = 800;
  var height = 600;

  // Fullscreen
  if( THREEx.FullScreen.available() ){
    THREEx.FullScreen.bindKey({ element : $("#canvaswrapper canvas")[0], dblclick : true} );

    $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange',
      function() {
        if( THREEx.FullScreen.activated() ){
          VIZ.setRendererSize(window.screen.availWidth, window.screen.availHeight);
        }
        else{
          VIZ.setRendererSize(width,height);
        }
        return null;
    });
  }

  // Resize renderer if it is maximized and the window is resized
  window.addEventListener('resize', _.debounce(
    function(event) {
      var mainWrapper = $("#mainWrapper");
      if(mainWrapper.css('display') == "none") {
        canvasWrapper.css('width',window.innerWidth);
        VIZ.setRendererSize(window.innerWidth, window.innerHeight);
      }
    }, 500, false));

  var context;
  var delayedAudible;

  function connectToAudioAnalyzer(sourceNode) {

    if(delayedAudible) delayedAudible.disconnect();

    delayedAudible = context.createDelay();
    //delayedAudible.delayTime.value = analyser.fftSize * 2 / context.sampleRate; //FFT lag
    delayedAudible.delayTime.value = 0.26; //Experimentally this feels better

    sourceNode.connect(delayedAudible)
    delayedAudible.connect(context.destination);

    VIZ.connectAudio(delayedAudible);
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
      setNextRandomPreset();
    });

    connectToAudioAnalyzer(endNode);
    VIZ.setPause(false);
  };

  var onStreamError = function(e) {
    console.error('Error getting microphone', e);
  };

  var getMicrophoneInput = function() {
    navigator.getUserMedia({audio: true},
                            onStream,
                            onStreamError);
  };

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
    return true;
  }

  initPlayer();
  getMicrophoneInput();
});
