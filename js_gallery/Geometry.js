var Geometry = function (game) {
  // call super class BABYLON.Mesh
  GameObject.call(this, "boothGeometry", game);

  // LIGHTS ////////////////////////////////////////////////////////////////////////////

  // ambient light
  var light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 0, 0),
    this.getScene()
  );
  light.intensity = 1;

  // MATERIALS ////////////////////////////////////////////////////////////////////////////

  var environment = this.getScene().createDefaultEnvironment({ enableGroundShadow: true, groundYBias: 1 });
  environment.setMainColor(BABYLON.Color3.FromHexString("#020202"));

  var uvMaterial = new BABYLON.StandardMaterial(
    "stageMaterial",
    this.getScene()
  );
  uvMaterial.diffuseTexture = new BABYLON.Texture(
    "./assets/BABYLON/uv-texture.jpg",
    this.getScene()
  );

  var whiteDiffuseMaterial = new BABYLON.StandardMaterial(
    "whiteDiffuseMaterial",
    this.getScene()
  );
  whiteDiffuseMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);

  var whiteSpecularMaterial = new BABYLON.StandardMaterial(
    "whiteSpecularMaterial",
    this.getScene()
  );
  whiteSpecularMaterial.specularColor = new BABYLON.Color3(1, 1, 1);

  

  var shaderMaterial = new BABYLON.ShaderMaterial("shader", this.getScene(), "./COMMON_TROUCHET", {
    attributes: ["position", "normal", "uv"],
    uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
  });
  shaderMaterial.backFaceCulling = false;

  // UNIFORM - TEXTURE 2D
  var mainTexture = new BABYLON.Texture("./assets/BAKE/UV.jpg", this.getScene());
  shaderMaterial.setTexture("textureSampler", mainTexture);

  // UNIFORM - TIME
  var time = 0.0;
  this.getScene().registerBeforeRender(function() {
    shaderMaterial.setFloat("time", time);
    time +=0.1;
  });

  // UNIFORM - SCREEN RESOLUTION
  shaderMaterial.setVector2("screenSize", 
    new BABYLON.Vector2(
      game.engine.getRenderWidth(),
      game.engine.getRenderHeight()
    )
  );

  // MESHES ////////////////////////////////////////////////////////////////////////////

  var ledScreenTeabar = game.assets["booth"].meshes[20];
  ledScreenTeabar.isVisible = true;
  
  var teabarVideoMaterial = new BABYLON.StandardMaterial(
    "teabarVideoMaterial",
    this.getScene()
  );
  var teabarVideoTexture = new BABYLON.VideoTexture(
    "teabarVideoTexture",
    "./assets/VIDEO/bunny1.mp4",
    this.getScene()
  );
  teabarVideoMaterial.diffuseTexture = teabarVideoTexture;
  //teabarVideoMaterial.roughness = 1;
  //teabarVideoMaterial.emissiveColor = new BABYLON.Color3.White();
  ledScreenTeabar.material = shaderMaterial;
  light.excludedMeshes.push(ledScreenTeabar);


  var ledScreenJapan = game.assets["booth"].meshes[21];
  ledScreenJapan.isVisible = true;
  var japanVideoMaterial = new BABYLON.StandardMaterial(
    "japanVideoMaterial",
    this.getScene()
  );
  var japanVideoTexture = new BABYLON.VideoTexture(
    "japanVideoTexture",
    "./assets/VIDEO/bunny2.mp4",
    this.getScene()
  );

  japanVideoMaterial.diffuseTexture = game.assets["LOGO"].texture;
  //japanVideoMaterial.roughness = 1;
  japanVideoMaterial.emissiveColor = new BABYLON.Color3.White();
  ledScreenJapan.material = japanVideoMaterial;
  /* this.getScene().onPointerObservable.add(function (evt2) {
    if (evt2.pickInfo.pickedMesh === ledScreenJapan) {
      //console.log("picked");
      if (japanVideoTexture.video.paused) japanVideoTexture.video.play();
      else japanVideoTexture.video.pause();
      console.log(japanVideoTexture.video.paused ? "paused" : "playing");
    }
  }, BABYLON.PointerEventTypes.POINTERPICK); */
  light.excludedMeshes.push(ledScreenJapan);



  var ledScreenBuilding = game.assets["booth"].meshes[22];
  ledScreenBuilding.isVisible = true;
  var buildingVideoMaterial = new BABYLON.StandardMaterial(
    "buildingVideoMaterial",
    this.getScene()
  );
  var buildingVideoTexture = new BABYLON.VideoTexture(
    "buildingVideoTexture",
    "./assets/VIDEO/bunny3.mp4",
    this.getScene()
  );
  buildingVideoMaterial.diffuseTexture = buildingVideoTexture;
  buildingVideoMaterial.roughness = 1;
  buildingVideoMaterial.emissiveColor = new BABYLON.Color3.White();
  ledScreenBuilding.material = buildingVideoMaterial;
  this.getScene().onPointerObservable.add(function (evt3) {
    if (evt3.pickInfo.pickedMesh === ledScreenBuilding) {
      //console.log("picked");
      if (buildingVideoTexture.video.paused) buildingVideoTexture.video.play();
      else buildingVideoTexture.video.pause();
      console.log(buildingVideoTexture.video.paused ? "paused" : "playing");
    }
  }, BABYLON.PointerEventTypes.POINTERPICK);
  light.excludedMeshes.push(ledScreenBuilding);



  var floorGlass = game.assets["booth"].meshes[27].clone(
    "FLOOR-GLASS-RIGHT-POSITION"
  );
  floorGlass.isVisible = true;
  floorGlass.checkCollisions = true;



  var floorBase = game.assets["booth"].meshes[28];
  floorBase.isVisible = true;
  var floorBaseMaterial = new BABYLON.StandardMaterial(
    "floorBaseMaterial",
    this.getScene()
  );
  floorBaseMaterial.diffuseColor = BABYLON.Color3.White();
  floorBase.material = floorBaseMaterial;



  var basePlane = new BABYLON.MeshBuilder.CreatePlane(
    "plane",
    { height: 400, width: 400 },
    this.getScene()
  );
  basePlane.position.y = -0.15;
  basePlane.rotation.x = Math.PI / 2;
  basePlane.checkCollisions = true;

  var material = new BABYLON.StandardMaterial(this.getScene());
  material.alpha = 1;
  material.diffuseColor = new BABYLON.Color3.FromHexString("#020202");
  basePlane.material = material;



  var mirrorFloorMaterial = new BABYLON.StandardMaterial(
    "mirror",
    this.getScene()
  );
  mirrorFloorMaterial.reflectionTexture = new BABYLON.MirrorTexture(
    "mirror",
    { ratio: 1 },
    this.getScene(),
    true
  );
  mirrorFloorMaterial.reflectionTexture.mirrorPlane = new BABYLON.Plane(
    0,
    -1,
    0,
    0
  );
  mirrorFloorMaterial.reflectionTexture.renderList = [
    ledScreenTeabar,
    ledScreenJapan,
    ledScreenBuilding,
  ];
  mirrorFloorMaterial.reflectionTexture.level = 0.15;
  mirrorFloorMaterial.reflectionTexture.adaptiveBlurKernel = 2;
  floorGlass.material = mirrorFloorMaterial;

  this.receiveShadows = true;

};

// object is a GameObject
Geometry.prototype = Object.create(GameObject.prototype);

// its constructor is the 'Geometry' function above
Geometry.prototype.constructor = Geometry;
