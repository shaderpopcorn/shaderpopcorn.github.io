var Booth = function (game) {
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
  light.diffuse = new BABYLON.Color3(1.0, 0.9, 0.9);
  light.specular = new BABYLON.Color3(0, 0, 0);
  /* light.groundColor = new BABYLON.Color3(0, 1, 0); */

  // directional light
  var dl1 = new BABYLON.DirectionalLight(
    "directionalLight",
    new BABYLON.Vector3(1.5, -3.5, 2.0),
    this.getScene()
  );
  dl1.intensity = 0.7;
  light.diffuse = new BABYLON.Color3(1, 1, 1);
  light.specular = new BABYLON.Color3(0, 0, 0);
  dl1.position = new BABYLON.Vector3(0, 0, 0);

  var dl2 = new BABYLON.DirectionalLight(
    "directionalLight1",
    new BABYLON.Vector3(0.0, -1.0, 2.0),
    this.getScene()
  );
  dl2.intensity = 4.0;
  dl2.position = new BABYLON.Vector3(0, 8, 0);
  dl2.diffuse = new BABYLON.Color3(1.0, 0.9, 0.9);

  var sl1 = new BABYLON.SpotLight(
    "spotLight1",
    new BABYLON.Vector3(-3.8, 7, 13.5),
    new BABYLON.Vector3(0, -1, 0),
    Math.PI / 4,
    20,
    this.getScene()
  );
  sl1.intensity = 200.0;
  sl1.diffuse = new BABYLON.Color3(1.0, 0.9, 0.9);
  sl1.specular = new BABYLON.Color3(0, 0, 0);
  
  var sl2 = new BABYLON.SpotLight(
    "spotLight2",
    new BABYLON.Vector3(-8.0, 7, 12.5),
    new BABYLON.Vector3(0, -1, 0),
    Math.PI / 4,
    20,
    this.getScene()
  );
  sl2.intensity = 200.0;
  sl2.diffuse = new BABYLON.Color3(1.0, 0.9, 0.9);
  sl2.specular = new BABYLON.Color3(0, 0, 0);

  var sl3 = new BABYLON.SpotLight(
    "spotLight3",
    new BABYLON.Vector3(2.0, 7, 12.5),
    new BABYLON.Vector3(0, -1, 0),
    Math.PI / 3,
    20,
    this.getScene()
  );
  sl3.intensity = 200.0;
  sl3.diffuse = new BABYLON.Color3(1.0, 0.9, 0.9);
  sl3.specular = new BABYLON.Color3(0, 0, 0);

  var sl4 = new BABYLON.SpotLight(
    "spotLight4",
    new BABYLON.Vector3(4.25, 7, 12.5),
    new BABYLON.Vector3(0, -1, 1.2),
    Math.PI / 3,
    20,
    this.getScene()
  );
  sl4.intensity = 400.0;
  sl4.diffuse = new BABYLON.Color3(1.0, 0.9, 0.9);
  sl4.specular = new BABYLON.Color3(0, 0, 0);

  var sl5 = new BABYLON.SpotLight(
    "spotLight5",
    new BABYLON.Vector3(7.5, 7, 7.0),
    new BABYLON.Vector3(0, -1, 1.7),
    Math.PI / 3,
    20,
    this.getScene()
  );
  sl5.intensity = 400.0;
  sl5.diffuse = new BABYLON.Color3(1.0, 0.9, 0.9);
  sl5.specular = new BABYLON.Color3(0, 0, 0);

  /* var sl6 = new BABYLON.SpotLight(
    "spotLight6",
    new BABYLON.Vector3(4.25, 7, 12.5),
    new BABYLON.Vector3(0, -1, 1.2),
    Math.PI / 3,
    20,
    this.getScene()
  );
  sl6.intensity = 400.0;
  sl6.diffuse = new BABYLON.Color3(1.0, 0.9, 0.9);
  sl6.specular = new BABYLON.Color3(0, 0, 0); */


  /* var dl3 = new BABYLON.DirectionalLight(
    "directionalLight2",
    new BABYLON.Vector3(0.0, -2.0, -1.5),
    this.getScene()
  );
  dl3.intensity = 0.7;
  dl3.position = new BABYLON.Vector3(0, 0, 0); */

  // MATERIALS ////////////////////////////////////////////////////////////////////////////

  // skybox
  /* var skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, this.getScene());
  var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this.getScene());
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
    "assets/skybox/TropicalSunnyDay",
    this.getScene()
  );
  skyboxMaterial.reflectionTexture.coordinatesMode =
    BABYLON.Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  skybox.material = skyboxMaterial; */

  var environment = this.getScene().createDefaultEnvironment({
    enableGroundShadow: true,
    groundYBias: 1,
  });
  environment.setMainColor(BABYLON.Color3.FromHexString("#020202"));

  // MESHES ////////////////////////////////////////////////////////////////////////////

  var wallsCeilingUF = game.assets["booth"].meshes[2];
  wallsCeilingUF.isVisible = true;
  wallsCeilingUF.checkCollisions = true;
  var wallsCeilingUFMaterial = new BABYLON.PBRMaterial(
    "wallsCeilingUFMaterial",
    this.getScene()
  );
  wallsCeilingUFMaterial.albedoTexture =
    game.assets["wallsCeilingUFTex"].texture;
  wallsCeilingUFMaterial.metallic = 0;
  wallsCeilingUFMaterial.roughness = 1;
  wallsCeilingUF.material = wallsCeilingUFMaterial;
  sl4.includedOnlyMeshes.push(wallsCeilingUF);

  var text = game.assets["booth"].meshes[3];
  text.isVisible = true;
  var textMaterial = new BABYLON.PBRMaterial("textMaterial", this.getScene());
  textMaterial.albedoColor = new BABYLON.Color3.Black();
  textMaterial.metallic = 0.3;
  textMaterial.roughness = 0.7;
  text.material = textMaterial;
  light.excludedMeshes.push(text);

  var tableSquare = game.assets["booth"].meshes[4];
  tableSquare.isVisible = true;
  tableSquare.position.z = 0.02;
  var tableSquareMaterial = new BABYLON.PBRMaterial(
    "tableSquareMaterial",
    this.getScene()
  );
  tableSquareMaterial.albedoTexture = game.assets["tableSquareTex"].texture;
  tableSquareMaterial.metallic = 0.3;
  tableSquareMaterial.roughness = 0.7;
  tableSquare.material = tableSquareMaterial;
  light.excludedMeshes.push(tableSquare);

  var tableRoundTop = game.assets["booth"].meshes[5];
  tableRoundTop.isVisible = true;
  var tableRoundTopMaterial = new BABYLON.PBRMaterial(
    "tableRoundTopMaterial",
    this.getScene()
  );
  tableRoundTopMaterial.albedoTexture = game.assets["tableRoundTopTex"].texture;
  tableRoundTopMaterial.metallic = 0.7;
  tableRoundTopMaterial.roughness = 0.3;
  tableRoundTop.material = tableRoundTopMaterial;
  light.excludedMeshes.push(tableRoundTop);

  var tableRoundLegs = game.assets["booth"].meshes[6];
  tableRoundLegs.isVisible = true;
  var tableRoundLegsMaterial = new BABYLON.PBRMaterial(
    "tableRoundLegsMaterial",
    this.getScene()
  );
  tableRoundLegsMaterial.albedoColor = new BABYLON.Color3(0.1, 0.1, 0.1);
  tableRoundLegsMaterial.metallic = 0.8;
  tableRoundLegsMaterial.roughness = 0.3;
  tableRoundLegs.material = tableRoundLegsMaterial;

  var tableDiningTop = game.assets["booth"].meshes[7];
  tableDiningTop.isVisible = true;
  var tableDiningTopMaterial = new BABYLON.PBRMaterial(
    "tableDiningTopMaterial",
    this.getScene()
  );
  tableDiningTopMaterial.albedoColor = BABYLON.Color3.White();
  tableDiningTopMaterial.metallic = 0.3;
  tableDiningTopMaterial.roughness = 0.7;
  tableDiningTop.material = tableDiningTopMaterial;
  light.excludedMeshes.push(tableDiningTop);

  var tableDiningLegs = game.assets["booth"].meshes[8];
  tableDiningLegs.isVisible = true;
  var tableDiningLegsMaterial = new BABYLON.PBRMaterial(
    "tableDiningLegsMaterial",
    this.getScene()
  );
  tableDiningLegsMaterial.albedoColor = BABYLON.Color3.White();
  tableDiningLegsMaterial.metallic = 0.3;
  tableDiningLegsMaterial.roughness = 0.7;
  tableDiningLegs.material = tableDiningLegsMaterial;

  var standingLampShade = game.assets["booth"].meshes[9];
  standingLampShade.isVisible = true;
  standingLampShade.position.x = -4.439;
  standingLampShade.position.z = 13.252;
  var standingLampShadeMaterial = new BABYLON.PBRMaterial(
    "standingLampShadeMaterial",
    this.getScene()
  );
  standingLampShadeMaterial.emissiveTexture =
    game.assets["standingLampShadeTex"].texture;
  standingLampShadeMaterial.emissiveColor = new BABYLON.Color3.White();
  standingLampShadeMaterial.metallic = 0.3;
  standingLampShadeMaterial.roughness = 0.7;
  standingLampShade.material = standingLampShadeMaterial;

  var standingLampShade1 =
  standingLampShade.createInstance("standingLampShade1");
  standingLampShade1.position.x = -8.56;
  standingLampShade1.position.z = 13.44;

  var standingLampBaseRim = game.assets["booth"].meshes[10];
  standingLampBaseRim.isVisible = true;
  standingLampBaseRim.position.x = -4.439;
  standingLampBaseRim.position.z = 13.252;
  var standingLampBaseRimMaterial = new BABYLON.PBRMaterial(
    "standingLampBaseRimMaterial",
    this.getScene()
  );
  standingLampBaseRimMaterial.albedoColor = new BABYLON.Color3.Black();
  standingLampBaseRimMaterial.metallic = 0.3;
  standingLampBaseRimMaterial.roughness = 0.7;
  standingLampBaseRim.material = standingLampBaseRimMaterial;

  var standingLampBaseRim1 = standingLampBaseRim.createInstance(
    "standingLampBaseRim1"
  );
  standingLampBaseRim1.position.x = -8.56;
  standingLampBaseRim1.position.z = 13.44;

  var stairsRailing = game.assets["booth"].meshes[11];
  stairsRailing.isVisible = true;
  var stairsRailingMaterial = new BABYLON.PBRMaterial(
    "stairsRailingMaterial",
    this.getScene()
  );
  stairsRailingMaterial.metallic = 0;
  stairsRailingMaterial.roughness = 1;
  stairsRailing.material = stairsRailingMaterial;

  var stage = game.assets["booth"].meshes[12];
  stage.isVisible = true;
  stage.checkCollisions = true;
  var stageMaterial = new BABYLON.ShaderMaterial(
    "shader",
    this.getScene(),
    "./COMMON_STAGE",
    {
      //needAlphaBlending : true,
      attributes: ["position", "normal", "uv"],
      defines: ["precision highp float;"],
      uniforms: [
        "world",
        "worldView",
        "worldViewProjection",
        "view",
        "iTime",
        "iResolution",
      ],
    }
  );
  stageMaterial.setVector2("iResolution", new BABYLON.Vector2(1, 1));
  var stageTexture = game.assets["stageTex"].texture;
  stageMaterial.setTexture("textureSampler", stageTexture);
  stage.material = stageMaterial;

  var stageCloth = game.assets["booth"].meshes[13];
  stageCloth.isVisible = true;
  stageCloth.checkCollisions = true;



  var sofas = game.assets["booth"].meshes[14];
  sofas.isVisible = true;
  var sofasMaterial = new BABYLON.PBRMaterial("sofasMaterial", this.getScene());
  sofasMaterial.albedoTexture = game.assets["sofasTex"].texture;
  sofasMaterial.metallic = 0;
  sofasMaterial.roughness = 1;
  sofas.material = sofasMaterial;
  light.excludedMeshes.push(sofas);
  //sl3.includedOnlyMeshes.push(sofas);

  var shaderRight = game.assets["booth"].meshes[15];
  shaderRight.isVisible = true;
  var shaderRightVideoMaterial = new BABYLON.StandardMaterial(
    "shaderRightVideoMaterial",
    this.getScene()
  );
  var shaderRightVideoTexture = new BABYLON.VideoTexture(
    "shaderRightVideoTexture",
    "./assets/VIDEO/WAVES-3_1_i.mp4",
    this.getScene()
  );
  shaderRightVideoTexture.video.muted = true;
  shaderRightVideoTexture.video.play();
  shaderRightVideoMaterial.diffuseTexture = shaderRightVideoTexture;
  shaderRightVideoMaterial.roughness = 1;
  shaderRightVideoMaterial.emissiveColor = new BABYLON.Color3.White();
  shaderRight.material = shaderRightVideoMaterial;
  this.getScene().onPointerObservable.add(function (evt1) {
    if (evt1.pickInfo.pickedMesh === shaderRight) {
      if (shaderRightVideoTexture.video.paused)
        shaderRightVideoTexture.video.play();
      else shaderRightVideoTexture.video.pause();
      console.log(shaderRightVideoTexture.video.paused ? "paused" : "playing");
    }
  }, BABYLON.PointerEventTypes.POINTERPICK);
  light.excludedMeshes.push(shaderRight);
  dl2.excludedMeshes.push(shaderRight);

  var shaderLeft = game.assets["booth"].meshes[16];
  shaderLeft.isVisible = true;
  var shaderLeftVideoMaterial = new BABYLON.StandardMaterial(
    "shaderLeftVideoMaterial",
    this.getScene()
  );
  var shaderLeftVideoTexture = new BABYLON.VideoTexture(
    "shaderLeftVideoTexture",
    "./assets/VIDEO/WAVES-3_2_i.mp4",
    this.getScene()
  );
  shaderLeftVideoTexture.video.muted = true;
  shaderLeftVideoTexture.video.play();
  shaderLeftVideoMaterial.diffuseTexture = shaderLeftVideoTexture;
  shaderLeftVideoMaterial.roughness = 1;
  shaderLeftVideoMaterial.emissiveColor = new BABYLON.Color3.White();
  shaderLeft.material = shaderLeftVideoMaterial;
  this.getScene().onPointerObservable.add(function (evt1) {
    if (evt1.pickInfo.pickedMesh === shaderLeft) {
      if (shaderLeftVideoTexture.video.paused)
        shaderLeftVideoTexture.video.play();
      else shaderLeftVideoTexture.video.pause();
      console.log(shaderLeftVideoTexture.video.paused ? "paused" : "playing");
    }
  }, BABYLON.PointerEventTypes.POINTERPICK);
  light.excludedMeshes.push(shaderLeft);
  dl2.excludedMeshes.push(shaderLeft);

  var pictures = game.assets["booth"].meshes[17];
  pictures.isVisible = true;
  
  var picturesMaterial = new BABYLON.StandardMaterial(
    "picturesMaterial",
    this.getScene()
  );
  picturesMaterial.diffuseTexture = game.assets["picturesTex"].texture;
  picturesMaterial.emissiveColor = new BABYLON.Color3.White();
  pictures.material = picturesMaterial;
  sl4.includedOnlyMeshes.push(pictures);
  //sl5.includedOnlyMeshes.push(pictures);

  var pictureFrames = game.assets["booth"].meshes[18];
  pictureFrames.isVisible = true;
  var pictureFramesMaterial = new BABYLON.StandardMaterial(
    "pictureFramesMaterial",
    this.getScene()
  );
  pictureFrames.material = pictureFramesMaterial;

  var louvrePanels = game.assets["booth"].meshes[19];
  louvrePanels.isVisible = true;
  var louvrePanelsMaterial = new BABYLON.PBRMaterial(
    "louvrePanelsMaterial",
    this.getScene()
  );
  louvrePanelsMaterial.albedoTexture = game.assets["louvrePanelsTex"].texture;
  louvrePanelsMaterial.metallic = 0;
  louvrePanelsMaterial.roughness = 1;
  louvrePanels.material = louvrePanelsMaterial;

  var louvrePanels1 = louvrePanels.createInstance("louvrePanels1");
  louvrePanels1.position.z = -1.72;

  var louvreFrame = game.assets["booth"].meshes[20];
  louvreFrame.isVisible = true;
  var louvreFrameMaterial = new BABYLON.PBRMaterial(
    "louvreFrameMaterial",
    this.getScene()
  );
  louvreFrameMaterial.albedoTexture = game.assets["louvrePanelsTex"].texture;
  louvreFrameMaterial.metallic = 0;
  louvreFrameMaterial.roughness = 1;
  louvreFrame.material = louvreFrameMaterial;

  var louvreFrame1 = louvreFrame.createInstance("louvreFrame1");
  louvreFrame1.position.z = -1.72;

  var logoLight = game.assets["booth"].meshes[21];
  logoLight.isVisible = true;
  var logoLightMaterial = new BABYLON.StandardMaterial(
    "logoLightMaterial",
    this.getScene()
  );
  logoLightMaterial.diffuseColor = new BABYLON.Color3(0.0, 0.0, 0.0);
  logoLight.material = logoLightMaterial;

  var logoChrome = game.assets["booth"].meshes[22];
  logoChrome.isVisible = true;
  var logoChromeMaterial = new BABYLON.PBRMaterial(
    "logoChromeMaterial",
    this.getScene()
  );
  logoChromeMaterial.metallic = 0.9;
  logoChromeMaterial.roughness = 0.1;
  logoChrome.material = logoChromeMaterial;

  var lightRim = game.assets["booth"].meshes[23];
  lightRim.isVisible = true;
  lightRim.position.x = -12.357;
  lightRim.position.z = 10.761;
  var lightRimMaterial = new BABYLON.StandardMaterial(
    "lightRimMaterial",
    this.getScene()
  );
  lightRimMaterial.diffuseColor = new BABYLON.Color3.Black();
  lightRim.material = lightRimMaterial;

  var lightRim1 = lightRim.createInstance("lightRim1");
  lightRim1.position.x = -12.357;
  lightRim1.position.z = 6.67;

  var lightRim2 = lightRim.createInstance("lightRim2");
  lightRim2.position.x = -3.252;
  lightRim2.position.z = 15.699;

  var lightRim3 = lightRim.createInstance("lightRim3");
  lightRim3.position.x = -7.804;
  lightRim3.position.z = 15.699;

  var lightRim4 = lightRim.createInstance("lightRim4");
  lightRim4.position.x = 5.853;
  lightRim4.position.z = 12.965;

  var lightRim5 = lightRim.createInstance("lightRim5");
  lightRim5.position.x = 1.301;
  lightRim5.position.z = 12.965;

  var lightRim6 = lightRim.createInstance("lightRim6");
  lightRim6.position.x = -3.252;
  lightRim6.position.z = 12.965;

  var lightRim7 = lightRim.createInstance("lightRim7");
  lightRim7.position.x = -7.804;
  lightRim7.position.z = 12.965;

  var lightRim8 = lightRim.createInstance("lightRim8");
  lightRim8.position.x = -7.804;
  lightRim8.position.z = 10.761;

  var lightRim9 = lightRim.createInstance("lightRim9");
  lightRim9.position.x = -3.252;
  lightRim9.position.z = 10.761;

  var lightLight = game.assets["booth"].meshes[24];
  lightLight.isVisible = true;
  lightLight.position.x = -12.357;
  lightLight.position.z = 10.761;
  var lightLightMaterial = new BABYLON.StandardMaterial(
    "lightLightMaterial",
    this.getScene()
  );
  lightLightMaterial.emissiveColor = new BABYLON.Color3.White();
  lightLight.material = lightLightMaterial;

  var lightLight1 = lightLight.createInstance("lightLight1");
  lightLight1.position.x = -12.357;
  lightLight1.position.z = 6.67;

  var lightLight2 = lightLight.createInstance("lightLight2");
  lightLight2.position.x = -3.252;
  lightLight2.position.z = 15.699;

  var lightLight3 = lightLight.createInstance("lightLight3");
  lightLight3.position.x = -7.804;
  lightLight3.position.z = 15.699;

  var lightLight4 = lightLight.createInstance("lightLight4");
  lightLight4.position.x = 5.853;
  lightLight4.position.z = 12.965;

  var lightLight5 = lightLight.createInstance("lightLight5");
  lightLight5.position.x = 1.301;
  lightLight5.position.z = 12.965;

  var lightLight6 = lightLight.createInstance("lightLight6");
  lightLight6.position.x = -3.252;
  lightLight6.position.z = 12.965;

  var lightLight7 = lightLight.createInstance("lightLight7");
  lightLight7.position.x = -7.804;
  lightLight7.position.z = 12.965;

  var lightLight8 = lightLight.createInstance("lightLight8");
  lightLight8.position.x = -7.804;
  lightLight8.position.z = 10.761;

  var lightLight9 = lightLight.createInstance("lightLight9");
  lightLight9.position.x = -3.252;
  lightLight9.position.z = 10.761;

  var gl = new BABYLON.GlowLayer("glow", this.getScene(), {
    mainTextureFixedSize: 2048,
    blurKernelSize: 4,
  });
  gl.addIncludedOnlyMesh(lightLight);
  gl.intensity = 0.7;

  var ledScreenTeabar = game.assets["booth"].meshes[25];
  ledScreenTeabar.isVisible = true;
  var teabarVideoMaterial = new BABYLON.StandardMaterial(
    "teabarVideoMaterial",
    this.getScene()
  );
  var teabarVideoTexture = new BABYLON.VideoTexture(
    "teabarVideoTexture",
    "./assets/VIDEO/INFINITI.mp4",
    this.getScene()
  );
  teabarVideoTexture.video.muted = true;
  teabarVideoTexture.video.play();
  teabarVideoMaterial.diffuseTexture = teabarVideoTexture;
  teabarVideoMaterial.roughness = 1;
  teabarVideoMaterial.emissiveColor = new BABYLON.Color3.White();
  ledScreenTeabar.material = teabarVideoMaterial;
  /* this.getScene().onPointerObservable.add(function (evt1) {
    if (evt1.pickInfo.pickedMesh === ledScreenTeabar) {
      if (teabarVideoTexture.video.paused) teabarVideoTexture.video.play();
      else teabarVideoTexture.video.pause();
      console.log(teabarVideoTexture.video.paused ? "paused" : "playing");
    }
  }, BABYLON.PointerEventTypes.POINTERPICK); */
  light.excludedMeshes.push(ledScreenTeabar);
  dl2.excludedMeshes.push(ledScreenTeabar);

  var ledScreenJapan = game.assets["booth"].meshes[26];
  ledScreenJapan.isVisible = true;
  var japanVideoMaterial = new BABYLON.StandardMaterial(
    "japanVideoMaterial",
    this.getScene()
  );
  var japanVideoTexture = new BABYLON.VideoTexture(
    "japanVideoTexture",
    "./assets/VIDEO/INFINITI.mp4",
    this.getScene()
  );
  japanVideoTexture.video.muted = true;
  japanVideoTexture.video.play();
  japanVideoMaterial.diffuseTexture = japanVideoTexture;
  japanVideoMaterial.roughness = 1;
  japanVideoMaterial.emissiveColor = new BABYLON.Color3.White();
  ledScreenJapan.material = japanVideoMaterial;
  /* this.getScene().onPointerObservable.add(function (evt2) {
    if (evt2.pickInfo.pickedMesh === ledScreenJapan) {
      if (japanVideoTexture.video.paused) japanVideoTexture.video.play();
      else japanVideoTexture.video.pause();
      console.log(japanVideoTexture.video.paused ? "paused" : "playing");
    }
  }, BABYLON.PointerEventTypes.POINTERPICK); */
  light.excludedMeshes.push(ledScreenJapan);
  dl2.excludedMeshes.push(ledScreenJapan);

  var ledScreenBuilding = game.assets["booth"].meshes[27];
  ledScreenBuilding.isVisible = true;
  var buildingVideoMaterial = new BABYLON.StandardMaterial(
    "buildingVideoMaterial",
    this.getScene()
  );
  var buildingVideoTexture = new BABYLON.VideoTexture(
    "buildingVideoTexture",
    "./assets/VIDEO/INFINITI_1.mp4",
    this.getScene()
  );
  buildingVideoTexture.video.muted = true;
  buildingVideoTexture.video.play();
  buildingVideoMaterial.diffuseTexture = buildingVideoTexture;
  buildingVideoMaterial.roughness = 1;
  buildingVideoMaterial.emissiveColor = new BABYLON.Color3.White();
  ledScreenBuilding.material = buildingVideoMaterial;
  /* this.getScene().onPointerObservable.add(function (evt3) {
    if (evt3.pickInfo.pickedMesh === ledScreenBuilding) {
      if (buildingVideoTexture.video.paused) buildingVideoTexture.video.play();
      else buildingVideoTexture.video.pause();
      console.log(buildingVideoTexture.video.paused ? "paused" : "playing");
    }
  }, BABYLON.PointerEventTypes.POINTERPICK); */
  light.excludedMeshes.push(ledScreenBuilding);
  dl2.excludedMeshes.push(ledScreenBuilding);

  var ledBackwallTeabar = game.assets["booth"].meshes[28];
  ledBackwallTeabar.isVisible = true;
  var ledBackwallTeabarMaterial = new BABYLON.PBRMaterial(
    "ledBackwallTeabarMaterial",
    this.getScene()
  );
  ledBackwallTeabarMaterial.albedoTexture = game.assets["ledBackwallTeabarTex"].texture;
  ledBackwallTeabarMaterial.metallic = 0;
  ledBackwallTeabarMaterial.roughness = 1;
  ledBackwallTeabar.material = ledBackwallTeabarMaterial;
  dl2.excludedMeshes.push(ledBackwallTeabar);

  ledBackwallTeabar.material = ledBackwallTeabarMaterial;


  var ledBackwallJapan = game.assets["booth"].meshes[29];
  ledBackwallJapan.isVisible = true;

  var text = '';
  var _scene = this.getScene();
  var getAPI = function(_scene, ledBackwallJapan){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.chucknorris.io/jokes/random', true);
        
    xhr.onload = function(){
      if(this.status === 200){
        const response = JSON.parse(this.responseText);
        text = response.value;
      }

      var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(ledBackwallJapan, 1920, 1152);

      var rectangle = new BABYLON.GUI.Rectangle("rect");
      rectangle.background = "white";
      rectangle.width = "1920px";
      rectangle.height = "1152px";

      advancedTexture.addControl(rectangle);

      var textDisplay = new BABYLON.GUI.TextBlock("textDisplay");
    
      textDisplay.lineSpacing = "10px";
      textDisplay.fontFamily = "Helvetica";
      textDisplay.textWrapping = true;
      textDisplay.text = text;
      textDisplay.color = "black";
      textDisplay.fontSize = "40px";
      textDisplay.width = "1000px";
      textDisplay.height = "600px";
      textDisplay.top = "-250";
      rectangle.addControl(textDisplay);
      }
      xhr.send();
    }

    getAPI(_scene, ledBackwallJapan);

    var anchor = new BABYLON.AbstractMesh("anchor", this.getScene());

    var manager = new BABYLON.GUI.GUI3DManager(this.getScene());

    var mat = new BABYLON.StandardMaterial("mat", this.getScene());
    var texture = game.assets["jokeTex"].texture;
    mat.diffuseTexture = texture;

    var columns = 6;  // 6 columns
    var rows = 1;  // 4 rows

    var faceUV = new Array(6);

    //set all values to zero
    for (var i = 0; i < 6; i++) {
      faceUV[i] = new BABYLON.Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
        //faceUV[i] = new BABYLON.Vector4(0, 0, 0, 0);
    }

    //overwrite wanted face with sprite coordinates
    //faceUV[1] = new BABYLON.Vector4(3 / columns, 0, (3 + 1) / columns, 1 / rows);


    var buttonBase = BABYLON.MeshBuilder.CreateBox("buttonBase", {height: 1.4, width: 0.25, depth: 0.25, faceUV: faceUV}, this.getScene());
    var buttonBaseMaterial = new BABYLON.PBRMaterial("buttonBaseMaterial", this.getScene());
    buttonBaseMaterial.albedoColor = new BABYLON.Color3.Black();
    buttonBaseMaterial.metallic = 0.5;
    buttonBaseMaterial.roughness = 0.5;
    buttonBase.material = mat;

    buttonBase.position.x = 3.125;
    buttonBase.position.y = 0.7;
    buttonBase.position.z = 4.25;
    buttonBase.rotation.y = 3.4;

    var button = new BABYLON.GUI.Button3D("yoke");
    manager.addControl(button);
    button.linkToTransformNode(anchor);
    anchor.parent = buttonBase;
    //anchor.position.x = 3.25;
    anchor.position.y = 0.0;
    anchor.position.z = -0.15;
    
    button.scaling = new BABYLON.Vector3(0.175, 1.5, 0.5);

    button.onPointerDownObservable.add(function(){
      getAPI(_scene, ledBackwallJapan);
    });   
    
    var text1 = new BABYLON.GUI.TextBlock();
    text1.text = "NEW YOKE";
    text1.color = "white";
    text1.fontSize = 40;
    button.content = text1; 

     

  var horizon = game.assets["booth"].meshes[30];
  horizon.isVisible = true;
  var horizonMaterial = new BABYLON.StandardMaterial(
    "horizonMaterial",
    this.getScene()
  );
  /* horizonMaterial.opacityTexture.uScale = 20.0;
  horizonMaterial.opacityTexture.vScale = 5.0; */

  var horizonMaterial = new BABYLON.ShaderMaterial(
    "shader",
    this.getScene(),
    "./COMMON_HORIZON",
    {
      needAlphaBlending: true,
      attributes: ["position", "normal", "uv"],
      uniforms: [
        "world",
        "worldView",
        "worldViewProjection",
        "view",
        "projection",
        "time",
      ],
    }
  );
  var horizonTexture = game.assets["horizonTex"].texture;
  horizonMaterial.setTexture("textureSampler", horizonTexture);
  horizon.material = horizonMaterial;

  var hangingLampsShade = game.assets["booth"].meshes[31];
  hangingLampsShade.isVisible = true;
  hangingLampsShade.position.x = -7.529;
  hangingLampsShade.position.z = 16.778;
  var hangingLampsShadeMaterial = new BABYLON.PBRMaterial(
    "hangingLampsShadeMaterial",
    this.getScene()
  );
  hangingLampsShadeMaterial.emissiveTexture =
    game.assets["hangingLampsShadeTex"].texture;
  hangingLampsShadeMaterial.emissiveColor = new BABYLON.Color3.White();
  hangingLampsShadeMaterial.metallic = 0.3;
  hangingLampsShadeMaterial.roughness = 0.7;
  hangingLampsShade.material = hangingLampsShadeMaterial;

  var hangingLampsShade1 =
    hangingLampsShade.createInstance("hangingLampsShade1");
  hangingLampsShade1.position.x = -3.988;
  hangingLampsShade1.position.z = 16.664;
  hangingLampsShade1.rotation.y = 40.0;

  var hangingLampsShade2 =
    hangingLampsShade.createInstance("hangingLampsShade2");
  hangingLampsShade2.position.x = 1.757;
  hangingLampsShade2.position.z = 12.123;
  hangingLampsShade2.rotation.y = 80.0;

  var hangingLampsBaseRim = game.assets["booth"].meshes[32];
  hangingLampsBaseRim.isVisible = true;
  hangingLampsBaseRim.position.x = -7.529;
  hangingLampsBaseRim.position.z = 16.778;
  var hangingLampsBaseRimMaterial = new BABYLON.PBRMaterial(
    "hangingLampsBaseRimMaterial",
    this.getScene()
  );
  hangingLampsBaseRimMaterial.albedoColor = new BABYLON.Color3.Black();
  hangingLampsBaseRimMaterial.metallic = 0.3;
  hangingLampsBaseRimMaterial.roughness = 0.7;
  hangingLampsBaseRim.material = hangingLampsBaseRimMaterial;

  var hangingLampsBaseRim1 = hangingLampsBaseRim.createInstance(
    "hangingLampsBaseRim1"
  );
  hangingLampsBaseRim1.position.x = -3.988;
  hangingLampsBaseRim1.position.z = 16.664;
  hangingLampsBaseRim1.rotation.y = 40.0;

  var hangingLampsBaseRim2 = hangingLampsBaseRim.createInstance(
    "hangingLampsBaseRim2"
  );
  hangingLampsBaseRim2.position.x = 1.757;
  hangingLampsBaseRim2.position.z = 12.123;
  hangingLampsBaseRim2.rotation.y = 80.0;

  var floorUF = game.assets["booth"].meshes[33];
  floorUF.isVisible = true;
  floorUF.checkCollisions = true;
  var floorUFMaterial = new BABYLON.PBRMaterial(
    "floorUFMaterial",
    this.getScene()
  );
  floorUFMaterial.albedoTexture = game.assets["floorUFTex"].texture;
  /* floorUFMaterial.albedoTexture.vOffset = 0.0015; */
  floorUFMaterial.metallic = 0.3;
  floorUFMaterial.roughness = 0.7;
  floorUF.material = floorUFMaterial;
  light.excludedMeshes.push(floorUF);

  var floorGlass = game.assets["booth"].meshes[34];
  floorGlass.isVisible = true;
  floorGlass.checkCollisions = true;
  /* dl2.excludedMeshes.push(floorGlass); */
  dl1.includedOnlyMeshes.push(floorGlass);


  // FLOOR BASE
  var floorBase = game.assets["booth"].meshes[35];
  floorBase.isVisible = true;
  var floorBaseMaterial = new BABYLON.PBRMaterial(
    "floorBaseMaterial",
    this.getScene()
  );
  floorBaseMaterial.metallic = 0.3;
  floorBaseMaterial.roughness = 0.7;
  floorBaseMaterial.albedoColor = BABYLON.Color3.White();
  floorBase.material = floorBaseMaterial;
  /* dl2.excludedMeshes.push(floorBase); */

  // EARCHAIR
  var earchair = game.assets["booth"].meshes[36];
  earchair.isVisible = true;
  earchair.scaling = new BABYLON.Vector3(1.075, 1.075, 1.075);
  earchair.position.x = -10.226;
  earchair.position.y = -0.25;
  earchair.position.z = 7.255;
  earchair.rotation.y = -1.0;
  var earchairMaterial = new BABYLON.PBRMaterial(
    "earchairMaterial",
    this.getScene()
  );
  earchairMaterial.metallic = 0.3;
  earchairMaterial.roughness = 0.7;
  earchairMaterial.albedoTexture = game.assets["earchairTex"].texture;
  earchair.material = earchairMaterial;
  light.excludedMeshes.push(earchair);

  var earchair1 = earchair.createInstance("earchair1");
  //earchair1.scaling = new BABYLON.Vector3(1.075,1.075,1.075);
  earchair1.position.x = -9.098;
  earchair1.position.y = -0.25;
  earchair1.position.z = 8.041;
  earchair1.rotation.y = -0.05;

  var earchair2 = earchair.createInstance("earchair2");
  //earchair2.scaling = new BABYLON.Vector3(1.075,1.075,1.075);
  earchair2.position.x = -7.572;
  earchair2.position.y = -0.25;
  earchair2.position.z = 8.978;
  earchair2.rotation.y = -0.7;

  var earchair3 = earchair.createInstance("earchair3");
  //earchair3.scaling = new BABYLON.Vector3(1.075,1.075,1.075);
  earchair3.position.x = -6.316;
  earchair3.position.y = -0.25;
  earchair3.position.z = 9.537;
  earchair3.rotation.y = -0.1;

  var earchair4 = earchair.createInstance("earchair4");
  //earchair4.scaling = new BABYLON.Vector3(1.075,1.075,1.075);
  earchair4.position.x = -4.422;
  earchair4.position.y = -0.25;
  earchair4.position.z = 10.381;
  earchair4.rotation.y = -0.8;

  var earchair5 = earchair.createInstance("earchair5");
  //earchair5.scaling = new BABYLON.Vector3(1.075,1.075,1.075);
  earchair5.position.x = -3.095;
  earchair5.position.y = -0.25;
  earchair5.position.z = 10.741;
  earchair5.rotation.y = 0.2;

  var earchair6 = earchair.createInstance("earchair6");
  //earchair6.scaling = new BABYLON.Vector3(1.075,1.075,1.075);
  earchair6.position.x = -8.768;
  earchair6.position.y = -0.25;
  earchair6.position.z = 12.757;
  earchair6.rotation.y = -1.3;
  sl1.includedOnlyMeshes.push(earchair6);

  var earchair7 = earchair.createInstance("earchair7");
  //earchair7.scaling = new BABYLON.Vector3(1.075,1.075,1.075);
  earchair7.position.x = -2.7;
  earchair7.position.y = -0.25;
  earchair7.position.z = 14.03;
  earchair7.rotation.y = 1.5;
  sl2.includedOnlyMeshes.push(earchair7);

  // CHAIR REST
  var chairRest = game.assets["booth"].meshes[37];
  chairRest.isVisible = true;
  chairRest.position.x = 6.92;
  chairRest.position.z = 11.308;
  var chairRestMaterial = new BABYLON.PBRMaterial(
    "chairRestMaterial",
    this.getScene()
  );
  chairRestMaterial.albedoTexture = game.assets["chairRestTex"].texture;
  chairRestMaterial.metallic = 0.3;
  chairRestMaterial.roughness = 0.7;
  chairRest.material = chairRestMaterial;

  var chairRest1 = chairRest.createInstance("chairRest1");
  chairRest1.isVisible = true;
  chairRest1.position.x = 6.92;
  chairRest1.position.z = 11.957;

  var chairRest2 = chairRest.createInstance("chairRest2");
  chairRest2.isVisible = true;
  chairRest2.position.x = 6.92;
  chairRest2.position.z = 12.673;

  var chairRest3 = chairRest.createInstance("chairRest3");
  chairRest3.isVisible = true;
  chairRest3.position.x = 6.92;
  chairRest3.position.z = 13.323;

  var chairRest4 = chairRest.createInstance("chairRest4");
  chairRest4.isVisible = true;
  chairRest4.position.x = 8.139;
  chairRest4.position.z = 13.323;
  chairRest4.rotation.y = Math.PI;

  var chairRest5 = chairRest.createInstance("chairRest5");
  chairRest5.isVisible = true;
  chairRest5.position.x = 8.139;
  chairRest5.position.z = 12.673;
  chairRest5.rotation.y = Math.PI;

  var chairRest6 = chairRest.createInstance("chairRest6");
  chairRest6.isVisible = true;
  chairRest6.position.x = 8.139;
  chairRest6.position.z = 11.957;
  chairRest6.rotation.y = Math.PI;

  var chairRest7 = chairRest.createInstance("chairRest7");
  chairRest7.isVisible = true;
  chairRest7.position.x = 8.139;
  chairRest7.position.z = 11.308;
  chairRest7.rotation.y = Math.PI;

  // CHAIR FRAME
  var chairFrame = game.assets["booth"].meshes[38];
  chairFrame.isVisible = true;
  chairFrame.scaling = new BABYLON.Vector3(1, 1, 1);
  chairFrame.position.x = 6.89;
  chairFrame.position.z = 11.325; //11.308;
  var chairFrameMaterial = new BABYLON.PBRMaterial(
    "chairFrameMaterial",
    this.getScene()
  );
  chairFrameMaterial.albedoColor = BABYLON.Color3.White();
  chairFrameMaterial.metallic = 0.3;
  chairFrameMaterial.roughness = 0.7;
  chairFrame.material = chairFrameMaterial;

  var chairFrame1 = chairFrame.createInstance("chairFrame1");
  chairFrame1.isVisible = true;
  chairFrame1.position.x = 6.89;
  chairFrame1.position.z = 11.975;

  var chairFrame2 = chairFrame.createInstance("chairFrame2");
  chairFrame2.isVisible = true;
  chairFrame2.position.x = 6.89;
  chairFrame2.position.z = 12.692;

  var chairFrame3 = chairFrame.createInstance("chairFrame3");
  chairFrame3.isVisible = true;
  chairFrame3.position.x = 6.89;
  chairFrame3.position.z = 13.34;

  var chairFrame4 = chairFrame.createInstance("chairFrame4");
  chairFrame4.isVisible = true;
  chairFrame4.position.x = 8.15;
  chairFrame4.position.z = 13.34;
  chairFrame4.rotation.y = Math.PI;

  var chairFrame5 = chairFrame.createInstance("chairFrame5");
  chairFrame5.isVisible = true;
  chairFrame5.position.x = 8.15;
  chairFrame5.position.z = 12.692;
  chairFrame5.rotation.y = Math.PI;

  var chairFrame6 = chairFrame.createInstance("chairFrame6");
  chairFrame6.isVisible = true;
  chairFrame6.position.x = 8.15;
  chairFrame6.position.z = 11.975;
  chairFrame6.rotation.y = Math.PI;

  var chairFrame7 = chairFrame.createInstance("chairFrame7");
  chairFrame7.isVisible = true;
  chairFrame7.position.x = 8.15;
  chairFrame7.position.z = 11.325;
  chairFrame7.rotation.y = Math.PI;

  // CARPETS
  var carpets = game.assets["booth"].meshes[39];
  carpets.isVisible = true;
  var carpetsMaterial = new BABYLON.PBRMaterial(
    "carpetsMaterial",
    this.getScene()
  );
  carpetsMaterial.albedoTexture = game.assets["carpetsTex"].texture;
  carpetsMaterial.metallic = 0.4;
  carpetsMaterial.roughness = 0.6;
  carpets.material = carpetsMaterial;
  sl1.includedOnlyMeshes.push(carpets);
  sl2.includedOnlyMeshes.push(carpets);
  //sl3.includedOnlyMeshes.push(carpets);

  // BOOTH WHITES ALL
  var boothWhitesAll = game.assets["booth"].meshes[40];
  boothWhitesAll.isVisible = true;
  boothWhitesAll.checkCollisions = true;
  var boothWhitesAllMaterial = new BABYLON.PBRMaterial(
    "boothWhitesAllMaterial",
    this.getScene()
  );
  boothWhitesAllMaterial.albedoTexture =
    game.assets["boothWhitesAllTex"].texture;
  boothWhitesAllMaterial.metallic = 0;
  boothWhitesAllMaterial.roughness = 1;
  boothWhitesAll.material = boothWhitesAllMaterial;
  dl2.excludedMeshes.push(boothWhitesAll);
  sl5.includedOnlyMeshes.push(boothWhitesAll);

  // BOOTH GLASS
  var boothGlass = game.assets["booth"].meshes[41];
  boothGlass.isVisible = true;
  boothGlass.checkCollisions = true;
  var glassMaterial = new BABYLON.PBRMaterial("glassMaterial", this.getScene());
  glassMaterial.indexOfRefraction = 0.5;
  glassMaterial.alpha = 0.25;
  glassMaterial.directIntensity = 0.7;
  glassMaterial.environmentIntensity = 0.7;
  glassMaterial.cameraExposure = 0.7;
  glassMaterial.cameraContrast = 1.0;
  glassMaterial.microSurface = 1;
  glassMaterial.reflectivityColor = new BABYLON.Color3(0.7, 0.7, 0.7);
  glassMaterial.albedoColor = new BABYLON.Color3(0.7, 0.7, 0.7);
  boothGlass.material = glassMaterial;

  // BENCHES
  var benches = game.assets["booth"].meshes[42];
  benches.isVisible = true;
  var benchesMaterial = new BABYLON.PBRMaterial(
    "benchesMaterial",
    this.getScene()
  );
  benchesMaterial.metallic = 0.3;
  benchesMaterial.roughness = 0.7;
  benchesMaterial.albedoTexture = game.assets["benchesTex"].texture;
  /* benchesMaterial.bumpTexture = new BABYLON.Texture("./assets/BAKE/BENCHES_NOR.jpg", this.getScene());
  benchesMaterial.bumpTexture.level = 0.1; */
  benches.material = benchesMaterial;
  dl2.excludedMeshes.push(benches);

  // BAR STONE
  var barStone = game.assets["booth"].meshes[43];
  barStone.isVisible = true;
  var barStoneMaterial = new BABYLON.PBRMaterial(
    "barStoneMaterial",
    this.getScene()
  );
  barStoneMaterial.albedoTexture = game.assets["barStoneTex"].texture;
  barStoneMaterial.metallic = 0.3;
  barStoneMaterial.roughness = 0.7;
  barStone.material = barStoneMaterial;

  // BAR FRAME
  var barFrame = game.assets["booth"].meshes[44];
  barFrame.isVisible = true;
  barFrame.position.z = 0.02;
  var barFrameMaterial = new BABYLON.PBRMaterial(
    "barFrameMaterial",
    this.getScene()
  );
  barFrameMaterial.albedoTexture = game.assets["barFrameTex"].texture;
  barFrameMaterial.metallic = 0.3;
  barFrameMaterial.roughness = 0.7;
  barFrame.material = barFrameMaterial;

  // ARMCHAIR BODY
  var armchairBody = game.assets["booth"].meshes[45];
  armchairBody.isVisible = true;
  armchairBody.scaling = new BABYLON.Vector3(1.1, 1.1, 1.1);
  armchairBody.position.x = -7.794;
  armchairBody.position.y = -0.35;
  armchairBody.position.z = 13.56;
  armchairBody.rotation.y = -0.0;
  var armchairBodyMaterial = new BABYLON.PBRMaterial(
    "armchairBodyMaterial",
    this.getScene()
  );
  armchairBodyMaterial.metallic = 0.3;
  armchairBodyMaterial.roughness = 0.7;
  armchairBodyMaterial.albedoTexture = game.assets["armchairBodyTex"].texture;
  armchairBody.material = armchairBodyMaterial;
  sl2.includedOnlyMeshes.push(armchairBody);

  var armchairBody1 = armchairBody.createInstance("armchairBody1");
  armchairBody1.position.x = -7.294;
  armchairBody1.position.y = -0.35;
  armchairBody1.position.z = 12.0;
  armchairBody1.rotation.y = -4.0;
  sl2.includedOnlyMeshes.push(armchairBody1);

  var armchairBody2 = armchairBody.createInstance("armchairBody2");
  armchairBody2.position.x = -3.427;
  armchairBody2.position.y = -0.35;
  armchairBody2.position.z = 12.97;
  armchairBody2.rotation.y = -3.5;
  sl1.includedOnlyMeshes.push(armchairBody2);

  var armchairBody3 = armchairBody.createInstance("armchairBody3");
  armchairBody3.position.x = -4.31;
  armchairBody3.position.y = -0.35;
  armchairBody3.position.z = 14.36;
  armchairBody3.rotation.y = -0.7;
  sl1.includedOnlyMeshes.push(armchairBody3);

  // ARMCHAIR BASE
  var armchairBase = game.assets["booth"].meshes[46];
  armchairBase.isVisible = true;
  armchairBase.scaling = new BABYLON.Vector3(1.1, 1.1, 1.1);
  armchairBase.position.x = -7.794;
  armchairBase.position.y = -0.35;
  armchairBase.position.z = 13.56;
  armchairBody.rotation.y = -0.0;
  var armchairBaseMaterial = new BABYLON.PBRMaterial(
    "armchairBaseMaterial",
    this.getScene()
  );
  armchairBaseMaterial.metallic = 0.3;
  armchairBaseMaterial.roughness = 0.7;
  armchairBaseMaterial.albedoColor = new BABYLON.Color3(0.0, 0.0, 0.0);
  armchairBase.material = armchairBaseMaterial;

  var armchairBase1 = armchairBase.createInstance("armchairBase1");
  armchairBase1.position.x = -7.294;
  armchairBase1.position.y = -0.35;
  armchairBase1.position.z = 12.0;
  armchairBase1.rotation.y = -4.0;

  var armchairBase2 = armchairBase.createInstance("armchairBase2");
  armchairBase2.position.x = -3.427;
  armchairBase2.position.y = -0.35;
  armchairBase2.position.z = 12.97;
  armchairBase2.rotation.y = -3.5;

  var armchairBase3 = armchairBase.createInstance("armchairBase3");
  armchairBase3.position.x = -4.31;
  armchairBase3.position.y = -0.35;
  armchairBase3.position.z = 14.36;
  armchairBase3.rotation.y = -0.7;

  // PASSWORD GATE
  var colliderStairs = game.assets["booth"].meshes[47];
  colliderStairs.isVisible = false;
  colliderStairs.material = glassMaterial;
  colliderStairs.checkCollisions = true;

  // GLASS ABOVE DOOR
  var noncolliderBoothGlass = game.assets["booth"].meshes[48];
  noncolliderBoothGlass.isVisible = true;
  noncolliderBoothGlass.material = glassMaterial;

  // BIG PLANE
  var basePlane = new BABYLON.MeshBuilder.CreatePlane(
    "plane",
    { height: 400, width: 400 },
    this.getScene()
  );
  basePlane.position.y = -0.15;
  basePlane.rotation.x = Math.PI / 2;
  basePlane.checkCollisions = true;

  var planeMaterial = new BABYLON.PBRMaterial("planeMaterial", this.getScene());
  planeMaterial.metallic = 0.0;
  planeMaterial.roughness = 1.0;
  planeMaterial.albedoColor = new BABYLON.Color3.FromHexString("#020202");
  basePlane.material = planeMaterial;

  // OTHER BOOTHS
  var otherBooth = new BABYLON.MeshBuilder.CreateBox("booth", {height: 8, width: 25, depth: 30}, this.getScene());
  otherBooth.position.x = -31.75;
  otherBooth.position.y = 4;
  otherBooth.position.z = 2.525;

  var otherBoothMaterial = new BABYLON.StandardMaterial('otherBoothMaterial', this.getScene());
	otherBoothMaterial.diffuseColor = BABYLON.Color3.Black();
  otherBoothMaterial.specularColor = new BABYLON.Color3(0.1,0.1,0.1);
	otherBoothMaterial.emissiveColor = new BABYLON.Color3(0.1,0.1,0.1);
  otherBoothMaterial.backFaceCulling = false;
	//otherBoothMaterial.alpha = 0.7;
  otherBooth.material = otherBoothMaterial;

  var otherBooth1 = otherBooth.createInstance("otherBooth1");
  otherBooth1.position.x = 28.75;

  var otherBooth2 = otherBooth.createInstance("otherBooth2");
  otherBooth2.position.x = 28.75;
  otherBooth2.position.z = -32.525;

  var otherBooth3 = otherBooth.createInstance("otherBooth3");
  otherBooth3.position.x = -2.75;
  otherBooth3.position.z = -32.525;

  var otherBooth4 = otherBooth.createInstance("otherBooth4");
  otherBooth4.position.x = -31.75;
  otherBooth4.position.z = -32.525;

  // ROBOT
  var robotBody = Robot(game, this.getScene()).robotBody;
  var robotHead = Robot(game, this.getScene()).robotHead;

  // COLLIDERS
  var teabarCollider = new BABYLON.MeshBuilder.CreateBox("teabarCollider", {height: 7, width: 5.5, depth: 1.5}, this.getScene());
  teabarCollider.position.x = -7;
  teabarCollider.position.y = 3.5;
  teabarCollider.position.z = -2.2;
  teabarCollider.rotation.y = Math.PI/1.265;
  teabarCollider.isVisible = false;
  teabarCollider.checkCollisions = true;

  var japanCollider = teabarCollider.createInstance("japanCollider");
  japanCollider.position.x = 4.9;
  japanCollider.position.y = 3.5;
  japanCollider.position.z = 3;
  japanCollider.rotation.y = Math.PI/-1.08;
  japanCollider.isVisible = false;
  japanCollider.checkCollisions = true;

  var carCollider = teabarCollider.createInstance("carCollider");
  carCollider.position.x = 0.1;
  carCollider.position.y = 0;
  carCollider.position.z = -0.5;
  carCollider.rotation.y = Math.PI/2.4;
  carCollider.scaling.z = 1.5;
  carCollider.isVisible = false;
  carCollider.checkCollisions = true;


  /* var mirrorStageMaterial = new BABYLON.StandardMaterial(
    "mirror",
    this.getScene()
  );
  mirrorStageMaterial.reflectionTexture = new BABYLON.MirrorTexture(
    "mirror",
    { ratio: 1 },
    this.getScene(),
    true
  );
  mirrorStageMaterial.reflectionTexture.mirrorPlane = new BABYLON.Plane(
    0,
    -1,
    0,
    0
  );
  mirrorStageMaterial.reflectionTexture.renderList = [
    ledScreenTeabar,
    stageCloth,
    ledScreenJapan,
    horizon,
    boothWhitesAll,
    ledScreenBuilding,
  ];
  mirrorStageMaterial.reflectionTexture.level = 0.25;
  mirrorStageMaterial.reflectionTexture.adaptiveBlurKernel = 150; */
  /* stage.material = mirrorStageMaterial; */

  var mirrorFloorMaterial = new BABYLON.StandardMaterial(
    "mirror",
    this.getScene()
  );
  /* mirrorFloorMaterial.emissiveColor = new BABYLON.Color3(1.0,1.0,1.0); */
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
    ledBackwallTeabar,
    stairsRailing,
    stageCloth,
    stage,
    ledScreenJapan,
    ledBackwallJapan,
    horizon,
    boothWhitesAll,
    wallsCeilingUF,
    ledScreenBuilding,
    benches,
    robotHead,
    robotBody,
    buttonBase
  ];
  mirrorFloorMaterial.reflectionTexture.level = 0.15;
  mirrorFloorMaterial.reflectionTexture.adaptiveBlurKernel = 1;
  floorGlass.material = mirrorFloorMaterial;

  const shadowGenerator = new BABYLON.ShadowGenerator(1024, dl2);
  shadowGenerator.addShadowCaster(earchair, true);
  shadowGenerator.addShadowCaster(earchair1, true);
  shadowGenerator.addShadowCaster(earchair2, true);
  shadowGenerator.addShadowCaster(earchair3, true);
  shadowGenerator.addShadowCaster(earchair4, true);
  shadowGenerator.addShadowCaster(earchair5, true);
  shadowGenerator.addShadowCaster(tableSquare, true);
  shadowGenerator.addShadowCaster(boothWhitesAll, true);
  floorUF.receiveShadows = true;
  shadowGenerator.useBlurExponentialShadowMap = true;
  /* shadowGenerator.useBlurCloseExponentialShadowMap = true; */
  shadowGenerator.useKernelBlur = true;
  shadowGenerator.blurKernel = 10;
  shadowGenerator.blurScale = 4;

  const shadowGeneratorSL1 = new BABYLON.ShadowGenerator(1024, sl1);
  shadowGeneratorSL1.addShadowCaster(armchairBody2, true);
  shadowGeneratorSL1.addShadowCaster(armchairBody3, true);
  shadowGeneratorSL1.addShadowCaster(earchair6, true);
  shadowGeneratorSL1.addShadowCaster(tableRoundTop, true);
  carpets.receiveShadows = true;
  shadowGeneratorSL1.useBlurExponentialShadowMap = true;
  //shadowGeneratorSL1.useBlurCloseExponentialShadowMap = true;
  shadowGeneratorSL1.useKernelBlur = true;
  shadowGeneratorSL1.blurKernel = 10;
  shadowGeneratorSL1.blurScale = 4;

  const shadowGeneratorSL2 = new BABYLON.ShadowGenerator(1024, sl2);
  shadowGeneratorSL2.addShadowCaster(earchair7, true);
  shadowGeneratorSL2.addShadowCaster(tableRoundTop, true);
  carpets.receiveShadows = true;
  shadowGeneratorSL2.useBlurExponentialShadowMap = true;
  //shadowGeneratorSL1.useBlurCloseExponentialShadowMap = true;
  shadowGeneratorSL2.useKernelBlur = true;
  shadowGeneratorSL2.blurKernel = 10;
  shadowGeneratorSL2.blurScale = 4;

  const shadowGeneratorSL5 = new BABYLON.ShadowGenerator(1024, sl5);
  shadowGeneratorSL5.addShadowCaster(logoLight, true);
  shadowGeneratorSL5.addShadowCaster(logoChrome, true);
  boothWhitesAll.receiveShadows = true;
  shadowGeneratorSL5.useBlurExponentialShadowMap = true;
  //shadowGeneratorSL1.useBlurCloseExponentialShadowMap = true;
  shadowGeneratorSL5.useKernelBlur = true;
  shadowGeneratorSL5.blurKernel = 5;
  shadowGeneratorSL5.blurScale = 2;

  var timeStage = 0;
  var timeHorizon = 0;
  this.getScene().registerBeforeRender(() => {
    timeStage += 0.01;
    stageMaterial.setFloat("iTime", timeStage);
    timeHorizon += 0.01;
    horizonMaterial.setFloat("time", timeHorizon);
    /* const aRatio = this.getScene().getEngine().getAspectRatio(canvas);
    stageMaterial.setVector2("iResolution", new BABYLON.Vector2(aRatio, 1)); */
  });
};

// object is a GameObject
Booth.prototype = Object.create(GameObject.prototype);

// its constructor is the 'Booth' function above
Booth.prototype.constructor = Booth;
