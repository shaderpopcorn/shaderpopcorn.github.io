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

  // camera switch
  this.execute = false;



  // key animation
  /* var animsKey = [];
  animsKey["idle"] = { from: 0, to: 80, speed: 1, loop: true }; */

  /* var animsSpikes = [];
  animsSpikes["idle"] = { from: 0, to: 100, speed: 5, loop: true }; */

  // all models to load
  var toLoadMesh = [
    {
      name: "booth",
      rootUrl: "assets/BABYLON/scenes/",
      sceneFilename: "MainScene.babylon",
      anims: [],
    },
  ];

  // all textures to load
  var toLoadTexture = [
    {
      name: "wallsCeilingUFTex",
      url: "assets/BAKE/WALLS+CEILING-UF.jpg",
      samplingMode: number = BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
    },
    {
      name: "tableSquareTex",
      url: "assets/BAKE/TABLE-SQUARE.jpg",
      samplingMode: number = BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
    },
    {
      name: "tableRoundTopTex",
      url: "assets/BAKE/TABLE-ROUND-TOP.jpg",
      samplingMode: number = BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
    },
    {
      name: "standingLampShadeTex",
      url: "assets/BAKE/LAMPSHADE.png",
      samplingMode: number = BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
    },
    {
      name: "stageTex",
      url: "assets/BAKE/STAGE.jpg",
      samplingMode: number = BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
    },
    {
      name: "stageClothTex",
      url: "assets/BAKE/STAGE-CLOTH.jpg",
      samplingMode: number = BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
    },
    {
      name: "stageClothTex1",
      url: "assets/BAKE/STAGE-CLOTH_1.png",
      samplingMode: number = BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
    },
    {
      name: "sofasTex",
      url: "assets/BAKE/SOFAS.jpg",
      samplingMode: number = BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
    },
    {
      name: "picturesTex",
      url: "assets/BAKE/PICTURES.jpg",
      samplingMode: number = BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
    },
    {
      name: "louvrePanelsTex",
      url: "assets/BAKE/LOUVRE-PANELS.jpg",
      samplingMode: number = BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
    },
    {
      name: "ledBackwallTeabarTex",
      url: "assets/BAKE/LED-BACKWALL-TEABAR.jpg",
      samplingMode: number = BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
    },
    {
      name: "ledBackwallJapanTex",
      url: "assets/BAKE/UV.jpg",
      samplingMode: number = BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
    },
    {
      name: "horizonTex",
      url: "assets/BAKE/PATTERN_1024_TINY.png",
      samplingMode: number = BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
    },
    {
      name: "hangingLampsShadeTex",
      url: "assets/BAKE/LAMPSHADE.png",
      samplingMode: number = BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
    },
    {
      name: "floorUFTex",
      url: "assets/BAKE/FLOOR-UF.jpg",
      samplingMode: number = BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
    },
    {
      name: "earchairTex",
      url: "assets/BAKE/EARCHAIR.jpg",
      samplingMode: number = BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
    },
    {
      name: "chairRestTex",
      url: "assets/BAKE/CHAIR-REST.jpg",
      samplingMode: number = BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
    },
    {
      name: "carpetsTex",
      url: "assets/BAKE/CARPETS.jpg",
      samplingMode: number = BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
    },
    {
      name: "boothWhitesAllTex",
      url: "assets/BAKE/BOOTH-WHITES-ALL.jpg",
      samplingMode: number = BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
    },
    {
      name: "benchesTex",
      url: "assets/BAKE/BENCHES.jpg",
      samplingMode: number = BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
    },
    {
      name: "barStoneTex",
      url: "assets/BAKE/BAR-STONE.jpg",
      samplingMode: number = BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
    },
    {
      name: "barFrameTex",
      url: "assets/BAKE/BAR-FRAME.jpg",
      samplingMode: number = BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
    },
    {
      name: "armchairBodyTex",
      url: "assets/BAKE/ARMCHAIR-BODY.jpg",
      samplingMode: number = BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
    },
    {
      name: "informationTex",
      url: "assets/BAKE/INFORMATION.png",
      samplingMode: number = BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
    },
    {
      name: "sampleGeometryTex",
      url: "assets/BAKE/MR.jpg",
      samplingMode: number = BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
    },
    {
      name: "sampleGeometry1Tex",
      url: "assets/BAKE/STAGE-CLOTH.jpg",
      samplingMode: number = BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
    },
    {
      name: "sampleGeometry3Tex",
      url: "assets/BAKE/STAGE-CLOTH.jpg",
      samplingMode: number = BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
    },
    {
      name: "microflakeNMap",
      url: "assets/BAKE/FLAKES.png",
      samplingMode: number = BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
    },
    {
      name: "normalMap",
      url: "assets/BAKE/GRASSN.png",
      samplingMode: number = BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
    },
  ];

  // creates a loader
  var loader = new BABYLON.AssetsManager(this.scene);
  loader.loadingUIBackgroundColor = "#2c2b29";


  var _this = this;
  // for each object to load
  toLoadMesh.forEach(function (tl) {
    var task = loader.addMeshTask(tl.name, "", tl.rootUrl, tl.sceneFilename);
    task.onSuccess = function (t) {
      // set all mesh invisible
      t.loadedMeshes.forEach(function (mesh) {
        mesh.isVisible = false;
      });
      // save it in the asset array
      _this.assets[t.name] = { meshes: t.loadedMeshes, anims: tl.anims };
    };
  });

  // for each texture to load
  toLoadTexture.forEach(function (tl) {
    var task = loader.addTextureTask(tl.name, tl.url, tl.samplingMode);
    task.onSuccess = function (t) {
      _this.assets[t.name] = { texture: t.texture };
    };
  });

  /* name: string, 
  meshesNames: any, 
  rootUrl: string, 
  sceneFilename: string

  name: string, 
  url: string, 
  noMipmap?: boolean, 
  invertY?: boolean, 
  samplingMode: number = BABYLON.Texture.TRILINEAR_SAMPLINGMODE */

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
  scene.enablePhysics(new BABYLON.Vector3(0, 0, 0), new BABYLON.AmmoJSPlugin());

  var colorGrading = new BABYLON.ColorGradingTexture("./assets/LUTS/F-8700-STD.3dl", scene);
	scene.imageProcessingConfiguration.colorGradingEnabled = true;
  scene.imageProcessingConfiguration.colorGradingTexture = colorGrading;
  colorGrading.level = 0.2;

  return scene;
};



Game.prototype._initGame = function () {

  // level creation
  this.level = Level.Infiniti(this.currentLevel, this);

  // camera creation
  var camera = Camera(this,this.scene,this.canvas).camera;
  var cameraTC = Camera(this,this.scene,this.canvas).cameraTC;

  Gui(this,this.scene,this.canvas,camera,cameraTC);

  /* var defaultPipeline = new BABYLON.DefaultRenderingPipeline("default", true, this.scene, this.activeCamera);
  defaultPipeline.bloomEnabled = true;
  defaultPipeline.fxaaEnabled = true;
  defaultPipeline.bloomWeight = 0.01; */

  //var postProcess = new BABYLON.BlackAndWhitePostProcess("bandw", 1.0, camera);

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
