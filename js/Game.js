window.addEventListener(
  "DOMContentLoaded",
  function () {
    new Game("gameCanvas");
  },
  false
);

var Game = function (canvasId) {
  var canvas = document.getElementById(canvasId);
  this.engine = new BABYLON.Engine(canvas, true);

  // BABYLON scene creation
  this.scene = this._initScene(this.engine);

  // all 3D models
  this.assets = [];

  // current level
  this.currentLevel = 1;

  // key animation
  /* var animsKey = [];
  animsKey["idle"] = { from: 0, to: 80, speed: 1, loop: true }; */

  /* var animsSpikes = [];
  animsSpikes["idle"] = { from: 0, to: 100, speed: 5, loop: true }; */

  // all meshes to load
  var toLoadMesh = [
    {
      name: "booth",
      folder: "assets/BABYLON/scenes/",
      filename: "MainScene.babylon",
      anims: [],
    },
  ];

  // all images to load
  var toLoadImage = [
    /* {
      name: "key",
      folder: "assets/",
      filename: "key.babylon",
      anims: animsKey,
    }, */
    /* {
      name: "spikes",
      folder: "assets/spikes/",
      filename: "spikes.babylon",
      anims: animsSpikes,
    }, */
    {
      name: "TEST",
      file: "assets/BAKE/EARCHAIR.jpg"
    },
  ];

   // all textures to load
   var toLoadTexture = [
    {
      name: "LOGO",
      file: "images/LOGO_512_ALPHA.png"
    },
    {
      name: "SHADERPOPCORN",
      file: "images/SHADERPOPCORN_1024_ALPHA.png"
    },
    {
      name: "EMAIL",
      file: "images/EMAIL_256_ALPHA.png"
    },
    {
      name: "CODE",
      file: "images/CODE_256_ALPHA.png"
    },
    {
      name: "INSTAGRAM",
      file: "images/INSTAGRAM_256_ALPHA.png"
    },

  ];

  // creates a loader
  var loader = new BABYLON.AssetsManager(this.scene);
  loader.loadingUIBackgroundColor = "#2c2b29";

  var _this = this;

  // for each object to load
  toLoadMesh.forEach(function (tl) {
    var task = loader.addMeshTask(tl.name, "", tl.folder, tl.filename);
    task.onSuccess = function (t) {
      // set all mesh invisible
      t.loadedMeshes.forEach(function (mesh) {
        mesh.isVisible = false;
      });
      // save it in the asset array
      _this.assets[t.name] = { meshes: t.loadedMeshes, anims: tl.anims };
    };
  });

  // for each image to load
  toLoadImage.forEach(function (tl) {
    var task = loader.addImageTask(tl.name, tl.file);
    task.onSuccess = function (t) {
      //console.log(t.image);
      // save it in the asset array
      _this.assets[t.name] = { image: t.image };
    };
  });

  // for each texture to load
  toLoadTexture.forEach(function (tl) {
    var task = loader.addTextureTask(tl.name, tl.file);
    task.onSuccess = function (t) {
      console.log(t.texture);
      // save it in the asset array
      _this.assets[t.name] = { texture: t.texture};
    };
  });

  loader.onFinish = function () {
    // init the game
    _this._initGame();

    _this.engine.runRenderLoop(function () {
      _this.scene.render();
    });
  };
  loader.load();
};

Game.prototype._initScene = function (engine) {
  // BABYLON scene creation
  var scene = new BABYLON.Scene(engine);
  scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
  scene.collisionsEnabled = true;


  // camera - necessary to see the world
  var camera = new BABYLON.FreeCamera(
    "UniversalCamera",
    new BABYLON.Vector3(-5, 2.0, -10),
    scene
  );
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.keysUp.push(87); //WASD controls
  camera.keysDown.push(83);
  camera.keysLeft.push(65);
  camera.keysRight.push(68);


  /* var camera = new BABYLON.GamepadCamera(
    "GamepadCamera",
    new BABYLON.Vector3(0, 2, -5),
    scene
  ); */

  camera.inertia = 0.2;
  camera.speed = 2;
  camera.angularSensibility = 500;
  camera.fov = 1;
  camera.checkCollisions = true;
  camera.applyGravity = true;
  camera.minZ = 0.1;
  camera.ellipsoid = new BABYLON.Vector3(0.25, 1.5, 0.25);
  camera.ellipsoidOffset = new BABYLON.Vector3(0, 1.3, 0);
  camera.attachControl(engine.getRenderingCanvas(), true);
 
  //camera.target = new BABYLON.Vector3(30, 0, 20);

  /* var camera = new BABYLON.ArcRotateCamera(
    "Camera",
    -Math.PI / 2,
    Math.PI / 2.2,
    20,
    BABYLON.Vector3.Zero()
  );
  camera.rotation = new BABYLON.Vector3(Math.PI / 3.5, -10, 0);
  camera.attachControl(engine.getRenderingCanvas(), true); */

  // enable physics engine
  /* scene.enablePhysics(
    new BABYLON.Vector3(0, -9.81, 0),
    new BABYLON.OimoJSPlugin()
  ); */

  scene.enablePhysics(new BABYLON.Vector3(0, 0, 0), new BABYLON.AmmoJSPlugin());

  /* var postProcess = new BABYLON.ImageProcessingPostProcess("processing", 1.0, camera);
  var curve = new BABYLON.ColorCurves();
  curve.globalHue = 20;
  curve.globalDensity = 8;
  curve.globalSaturation = 8;

  curve.highlightsHue = 2;
  curve.highlightsDensity = 8;
  curve.highlightsSaturation = -8;

  curve.shadowsHue = 2;
  curve.shadowsDensity = 80;
  curve.shadowsSaturation = 40;
  postProcess.colorCurvesEnabled = true;
  postProcess.colorCurves = curve; */

  

  return scene;
};

Game.prototype._initGame = function () {

  // level creation
  this.level = Level.Infiniti(this.currentLevel, this);

  this.booth = new Geometry(this);
  this.gui = new Gui(this);

 /*  var test = this.assets["booth"].meshes[10];
  
  var testCam = this.scene.activeCamera;
  
  testCam.onCollide = function (colMesh) {
		if (colMesh.uniqueId === test.uniqueId) {
      this.gui.password();
      console.log(testCam.name);
      console.log(test.name);
		}
	} */

  

  // debug layer
  this.scene.onKeyboardObservable.add((kbInfo) => {
    switch (kbInfo.type) {
			case BABYLON.KeyboardEventTypes.KEYDOWN:
				switch (kbInfo.event.key) {
                    case "y":
                      this.scene.debugLayer.show();
                    break
                    case "Y":
                      this.scene.debugLayer.hide();
                    break
                }
			break;
		}
  });

};

/* Game.prototype.nextLevel = function () {
  this.currentLevel++;
  this.level.dispose();
  this.level = Level.Infiniti(this.currentLevel, this);
  this.reset();
}; */

// game reset
/* Game.prototype.reset = function () {
  this.player.reset(this.level.start.position.clone());
}; */
