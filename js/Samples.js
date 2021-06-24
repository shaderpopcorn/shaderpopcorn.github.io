var Samples = function (game) {
  // call super class BABYLON.Mesh
  GameObject.call(this, "samples", game);

  var sampleGeometry = new BABYLON.MeshBuilder.CreateSphere(
    "sampleGeometry",
    { segments: 10, diameter: 0.3 },
    this.getScene()
  );
  sampleGeometry.position.x = -5.591;
  sampleGeometry.position.y = 1.593;
  sampleGeometry.position.z = -0.888;

  var sampleGeometryMaterial = new BABYLON.PBRMaterial("sampleGeometryMaterial", this.getScene());
  //sampleGeometryMaterial.albedoColor = new BABYLON.Color3(1.0, 0.766, 0.336);
  sampleGeometryMaterial.albedoTexture = new BABYLON.Texture("./assets/BAKE/ALBEDO.png", this.getScene());
  //sampleGeometryMaterial.albedoColor = new BABYLON.Color3(205/255, 127/255, 50/255);
  sampleGeometryMaterial.metallic = 1.0; // set to 1 to only use it from the metallicRoughnessTexture
  sampleGeometryMaterial.roughness = 1.0; // set to 1 to only use it from the metallicRoughnessTexture
  sampleGeometryMaterial.reflectionTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("./assets/BAKE/ENVIRONMENT.dds", this.getScene());
  sampleGeometryMaterial.metallicTexture = game.assets["sampleGeometryTex"].texture;
  sampleGeometryMaterial.useRoughnessFromMetallicTextureAlpha = false;
  sampleGeometryMaterial.useRoughnessFromMetallicTextureGreen = true;
  sampleGeometryMaterial.useMetallnessFromMetallicTextureBlue = true;
  sampleGeometryMaterial.bumpTexture = new BABYLON.Texture("./assets/BAKE/BUMP.png", this.getScene());
  sampleGeometry.material = sampleGeometryMaterial;



  var sampleGeometry1 = sampleGeometry.clone("sampleGeometry1");
  sampleGeometry1.position.x = -6.327;
  sampleGeometry1.position.y = 1.593;
  sampleGeometry1.position.z = -1.458;

  var sampleGeometryMaterial1 = new BABYLON.PBRMaterial(
    "sampleGeometry1Material",
    this.getScene()
  );
  sampleGeometryMaterial1.albedoTexture = new BABYLON.Texture("./assets/BAKE/BURLAP-ALBEDO.png", this.getScene());
  sampleGeometryMaterial1.metallic = 1.0;
  sampleGeometryMaterial1.roughness = 1.0;
  sampleGeometryMaterial1.albedoTexture.uScale = 5.0;
  sampleGeometryMaterial1.albedoTexture.vScale = 5.0;
  sampleGeometryMaterial1.metallicTexture = game.assets["sampleGeometry1Tex"].texture;
  sampleGeometryMaterial1.useRoughnessFromMetallicTextureAlpha = false;
  sampleGeometryMaterial1.useRoughnessFromMetallicTextureGreen = true;
  sampleGeometryMaterial1.useMetallnessFromMetallicTextureBlue = true;
  sampleGeometryMaterial1.metallicTexture.uScale = 5.0;
  sampleGeometryMaterial1.metallicTexture.vScale = 5.0;
  sampleGeometryMaterial1.bumpTexture = new BABYLON.Texture("./assets/BAKE/BURLAP-BUMP.png", this.getScene());
  sampleGeometryMaterial1.bumpTexture.uScale = 5.0;
  sampleGeometryMaterial1.bumpTexture.vScale = 5.0;
  sampleGeometry1.material = sampleGeometryMaterial1;



  var sampleGeometry2 = sampleGeometry.clone("sampleGeometry2");
  sampleGeometry2.position.x = -7.062;
  sampleGeometry2.position.y = 1.593;
  sampleGeometry2.position.z = -2.026;

  var sampleGeometryMaterial2 = new BABYLON.PBRCustomMaterial("sampleGeometryMaterial2", this.getScene());
  sampleGeometryMaterial2.metallic = 1.0;
  sampleGeometryMaterial2.roughness = 0.5;
  sampleGeometry2.material = sampleGeometryMaterial2;
  sampleGeometryMaterial2.sheen.isEnabled = true;



  var sampleGeometry3 = sampleGeometry.clone("sampleGeometry3");
  sampleGeometry3.position.x = -7.798;
  sampleGeometry3.position.y = 1.593;
  sampleGeometry3.position.z = -2.595;

  var sampleGeometryMaterial3 = new BABYLON.PBRCustomMaterial("sampleGeometryMaterial3", this.getScene());
  sampleGeometryMaterial3.metallic = 0;
  sampleGeometryMaterial3.roughness = 0.5;
  sampleGeometryMaterial3.albedoTexture = game.assets["sampleGeometry3Tex"].texture;
  //sampleGeometryMaterial3.albedoTexture.hasAlpha = true;
  //sampleGeometryMaterial3.transparencyMode = BABYLON.Material.MATERIAL_ALPHABLEND;
  //sampleGeometryMaterial3.useAlphaFromAlbedoTexture = true;
  sampleGeometryMaterial3.albedoColor = new BABYLON.Color3(0.01, 0.01, 0.01);
  sampleGeometryMaterial3.Fragment_Before_FragColor(`
          //if (finalColor.a < 0.99) {
          //    finalColor = vec4(1., 1., 0., 1.);
          //}
          finalColor *= vec4(1., 0., 1., 1.);
      `);
  sampleGeometry3.material = sampleGeometryMaterial3;



  var sampleGeometry4 = sampleGeometry.clone("sampleGeometry4");
  sampleGeometry4.position.x = -8.534;
  sampleGeometry4.position.y = 1.593;
  sampleGeometry4.position.z = -3.163;

  var sampleGeometryMaterial4 = new BABYLON.PBRCustomMaterial("sampleGeometryMaterial4", this.getScene());
  var sampleGeometryMaterial4 = new BABYLON.ShaderMaterial(
    "shader",
    this.getScene(),
    "./COMMON_CARPAINT",
    {
      attributes: ["position", "uv","normal"],
      uniforms: ["worldViewProjection", "worldView", "projection"]
    }
  );
  //sampleGeometryMaterial4.setTexture("microflakeNMap", new BABYLON.Texture("./assets/BAKE/FLAKES.png", this.getScene()));
  //sampleGeometryMaterial4.setTexture("normalMap", new BABYLON.Texture("./assets/BAKE/GRASSN.png", this.getScene()));
  sampleGeometryMaterial4.setTexture("microflakeNMap", game.assets["microflakeNMap"].texture, this.getScene());
  sampleGeometryMaterial4.setTexture("normalMap", game.assets["normalMap"].texture, this.getScene());
  sampleGeometryMaterial4.setTexture("envMap", this.getScene().environmentTexture);
  sampleGeometryMaterial4.setFloat("normalScale", 0.0);
  sampleGeometryMaterial4.setFloat("glossLevel", 0.5);
  sampleGeometryMaterial4.setFloat("brightnessFactor", 0.5);
  sampleGeometryMaterial4.setFloat("flakeScale", -80.0);
  sampleGeometryMaterial4.setFloat("normalPerturbation", 1.0);
  sampleGeometryMaterial4.setFloat("microflakePerturbationA", 0.1);
  sampleGeometryMaterial4.setFloat("microflakePerturbation", 0.48);
  sampleGeometryMaterial4.setColor3("paintColor1", new BABYLON.Color3(102/255, 0, 89/255));
  sampleGeometryMaterial4.setColor3("paintColor2", new BABYLON.Color3(0.0,0.0,153/255));
  sampleGeometryMaterial4.setColor3("paintColor3", new BABYLON.Color3(0.0,0.0,128/255));
  sampleGeometryMaterial4.setColor3("flakeColor", new BABYLON.Color3(1,1,1));
  sampleGeometryMaterial4.setVector3("cameraPosition", BABYLON.Vector3.Zero());
  sampleGeometry4.material = sampleGeometryMaterial4;

  

  var startingPoint;
  var currentMesh;
  var stageCloth = game.assets["booth"].meshes[13];
  stageCloth.isVisible = true;
  stageCloth.checkCollisions = true;

  var stageClothMaterial = new BABYLON.PBRMaterial("stageClothMaterial", this.getScene());
  stageClothMaterial.albedoColor = new BABYLON.Color3(205/255, 127/255, 50/255);
  stageClothMaterial.reflectivityColor = new BABYLON.Color3(1.0, 1.0, 1.0);
  stageClothMaterial.microSurface = 1.0; // Let the texture controls the value 
  stageClothMaterial.reflectionTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("./assets/BAKE/ENVIRONMENT.dds", this.getScene());
  stageClothMaterial.reflectivityTexture = new BABYLON.Texture("./assets/BAKE/SG_1.png", this.getScene());
  stageClothMaterial.useMicroSurfaceFromReflectivityMapAlpha = true;
  stageCloth.material = stageClothMaterial;


  
  var pointerDown = function (mesh) {
    currentMesh = mesh;
    if (startingPoint) {
      // we need to disconnect camera from canvas
      setTimeout(function () {
        this.getScene().activeCamera.detachControl(canvas);
      }, 0);
    }
    switch (mesh) {
      case sampleGeometry:
        stageCloth.material = sampleGeometryMaterial;
        break;
      case sampleGeometry1:
        stageCloth.material = sampleGeometryMaterial1;
        break;
      case sampleGeometry2:
        stageCloth.material = sampleGeometryMaterial2;
        break;
      case sampleGeometry3:
        stageCloth.material = sampleGeometryMaterial3;
        break;
      case sampleGeometry4:
        stageCloth.material = sampleGeometryMaterial4;
        break;
    }
  };

  var pointerUp = function (mesh) {
    if (startingPoint) {
      this.getScene().activeCamera.attachControl(canvas, true);
      startingPoint = null;
      return;
    }
  };

  this.getScene().onPointerObservable.add((pointerInfo) => {
    switch (pointerInfo.type) {
      case BABYLON.PointerEventTypes.POINTERDOWN:
        pointerDown(pointerInfo.pickInfo.pickedMesh);
        break;
      case BABYLON.PointerEventTypes.POINTERUP:
        pointerUp(pointerInfo.pickInfo.pickedMesh);
        break;
      case BABYLON.PointerEventTypes.POINTERMOVE:
        //pointerMove();
        break;
    }
  });

  var timeSampleGeometry = 0;
  this.getScene().registerBeforeRender(() => {
    timeSampleGeometry += 0.005;
    sampleGeometry.rotation.y = timeSampleGeometry;
    sampleGeometry1.rotation.y = timeSampleGeometry;
    sampleGeometry2.rotation.y = timeSampleGeometry;
    sampleGeometry3.rotation.y = timeSampleGeometry;
    sampleGeometry4.rotation.y = timeSampleGeometry;
  });
};

// object is a GameObject
Samples.prototype = Object.create(GameObject.prototype);

// its constructor is the 'Samples' function above
Samples.prototype.constructor = Samples;