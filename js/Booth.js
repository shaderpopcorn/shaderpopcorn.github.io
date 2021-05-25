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
  light.intensity = 0.4;
  light.diffuse = new BABYLON.Color3(1, 0.9, 0.9);
  light.specular = new BABYLON.Color3(0, 0, 0);
  /* light.groundColor = new BABYLON.Color3(0, 1, 0); */

  // directional light
  /* var dl1 = new BABYLON.DirectionalLight(
    "directionalLight",
    new BABYLON.Vector3(1.5, -1.5, 2.0),
    this.getScene()
  );
  dl1.intensity = 0.7;
  light.diffuse = new BABYLON.Color3(1, 1, 1);
	light.specular = new BABYLON.Color3(0, 0, 0);
  dl1.position = new BABYLON.Vector3(0, 0, 0); */

  var dl2 = new BABYLON.DirectionalLight(
    "directionalLight1",
    new BABYLON.Vector3(0.0, -1.0, 2.0),
    this.getScene()
  );
  dl2.intensity = 4.0;
  dl2.position = new BABYLON.Vector3(0, 8, 0);

  var sl1 = new BABYLON.SpotLight(
    "spotLight1",
    new BABYLON.Vector3(-4, 6.5, 11),
    new BABYLON.Vector3(0, -1, 0),
    Math.PI / 3,
    2,
    this.getScene()
  );

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

  // MESHES ////////////////////////////////////////////////////////////////////////////

  var wallsCeilingUF = game.assets["booth"].meshes[2];
  wallsCeilingUF.isVisible = true;
  wallsCeilingUF.checkCollisions = true;
  var wallsCeilingUFMaterial = new BABYLON.PBRMaterial(
    "wallsCeilingUFMaterial",
    this.getScene()
  );
  wallsCeilingUFMaterial.albedoTexture = new BABYLON.Texture(
    "./assets/BAKE/WALLS+CEILING-UF.jpg",
    this.getScene()
  );
  wallsCeilingUFMaterial.metallic = 0;
  wallsCeilingUFMaterial.roughness = 1;
  wallsCeilingUF.material = wallsCeilingUFMaterial;
  /* light.excludedMeshes.push(wallsCeilingUF); */

  var tableSquare = game.assets["booth"].meshes[3];
  tableSquare.isVisible = true;
  var tableSquareMaterial = new BABYLON.PBRMaterial(
    "tableSquareMaterial",
    this.getScene()
  );
  tableSquareMaterial.albedoTexture = new BABYLON.Texture(
    "./assets/BAKE/TABLE-SQUARE.jpg",
    this.getScene()
  );
  tableSquareMaterial.metallic = 0.3;
  tableSquareMaterial.roughness = 0.7;
  tableSquare.material = tableSquareMaterial;
  light.excludedMeshes.push(tableSquare);

  var tableRoundTop = game.assets["booth"].meshes[4];
  tableRoundTop.isVisible = true;
  var tableRoundTopMaterial = new BABYLON.PBRMaterial(
    "tableRoundTopMaterial",
    this.getScene()
  );
  tableRoundTopMaterial.albedoTexture = new BABYLON.Texture(
    "./assets/BAKE/TABLE-ROUND-TOP.jpg",
    this.getScene()
  );
  tableRoundTopMaterial.metallic = 0.7;
  tableRoundTopMaterial.roughness = 0.3;
  tableRoundTop.material = tableRoundTopMaterial;
  light.excludedMeshes.push(tableRoundTop);

  var tableRoundLegs = game.assets["booth"].meshes[5];
  tableRoundLegs.isVisible = true;
  var tableRoundLegsMaterial = new BABYLON.PBRMaterial(
    "tableRoundLegsMaterial",
    this.getScene()
  );
  tableRoundLegsMaterial.albedoColor = new BABYLON.Color3(0.1, 0.1, 0.1);
  tableRoundLegsMaterial.metallic = 0.8;
  tableRoundLegsMaterial.roughness = 0.3;
  tableRoundLegs.material = tableRoundLegsMaterial;

  var tableDiningTop = game.assets["booth"].meshes[6];
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

  var tableDiningLegs = game.assets["booth"].meshes[7];
  tableDiningLegs.isVisible = true;
  var tableDiningLegsMaterial = new BABYLON.PBRMaterial(
    "tableDiningLegsMaterial",
    this.getScene()
  );
  tableDiningLegsMaterial.albedoColor = BABYLON.Color3.White();
  tableDiningLegsMaterial.metallic = 0.3;
  tableDiningLegsMaterial.roughness = 0.7;
  tableDiningLegs.material = tableDiningLegsMaterial;

  var standingLampShade = game.assets["booth"].meshes[8];
  standingLampShade.isVisible = true;
  standingLampShade.position.x = -4.439;
  standingLampShade.position.z = 13.252;
  var standingLampShadeMaterial = new BABYLON.PBRMaterial(
    "standingLampShadeMaterial",
    this.getScene()
  );
  standingLampShadeMaterial.emissiveTexture = new BABYLON.Texture(
    "./assets/BAKE/LAMPSHADE.png",
    this.getScene()
  );
  standingLampShadeMaterial.emissiveColor = new BABYLON.Color3.White();
  standingLampShadeMaterial.metallic = 0.3;
  standingLampShadeMaterial.roughness = 0.7;
  standingLampShade.material = standingLampShadeMaterial;

  var standingLampShade1 =
    standingLampShade.createInstance("standingLampShade1");
  standingLampShade1.position.x = -8.56;
  standingLampShade1.position.z = 13.44;

  var standingLampBaseRim = game.assets["booth"].meshes[9];
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

  var stairsRailing = game.assets["booth"].meshes[10];
  stairsRailing.isVisible = true;
  var stairsRailingMaterial = new BABYLON.PBRMaterial(
    "stairsRailingMaterial",
    this.getScene()
  );
  stairsRailingMaterial.metallic = 0;
  stairsRailingMaterial.roughness = 1;
  stairsRailing.material = stairsRailingMaterial;

  var stage = game.assets["booth"].meshes[11];
  stage.isVisible = true;
  stage.checkCollisions = true;

  var stageCloth = game.assets["booth"].meshes[12];
  stageCloth.isVisible = true;
  stageCloth.checkCollisions = true;
  var stageClothMaterial = new BABYLON.PBRMaterial(
    "stageClothMaterial",
    this.getScene()
  );
  stageClothMaterial.albedoColor = new BABYLON.Color3(0.05, 0.05, 0.05);
  stageClothMaterial.metallic = 0.4;
  stageClothMaterial.roughness = 0.6;
  stageCloth.material = stageClothMaterial;

  var sofas = game.assets["booth"].meshes[13];
  sofas.isVisible = true;
  /* sofas.scaling = new BABYLON.Vector3(1.075, 1.075, 1.075);
  sofas.position.x = 0.1;
  sofas.position.y = -0.25;
  sofas.position.z = -0.8; */
  var sofasMaterial = new BABYLON.PBRMaterial("sofasMaterial", this.getScene());
  sofasMaterial.albedoTexture = new BABYLON.Texture(
    "./assets/BAKE/SOFAS.jpg",
    this.getScene()
  );
  sofasMaterial.metallic = 0;
  sofasMaterial.roughness = 1;
  sofas.material = sofasMaterial;
  light.excludedMeshes.push(sofas);

  var pictures = game.assets["booth"].meshes[14];
  pictures.isVisible = true;
  var picturesMaterial = new BABYLON.StandardMaterial(
    "picturesMaterial",
    this.getScene()
  );
  picturesMaterial.diffuseTexture = new BABYLON.Texture(
    "./assets/BAKE/PICTURES.jpg",
    this.getScene()
  );
  pictures.material = picturesMaterial;

  var pictureFrames = game.assets["booth"].meshes[15];
  pictureFrames.isVisible = true;
  var pictureFramesMaterial = new BABYLON.StandardMaterial(
    "pictureFramesMaterial",
    this.getScene()
  );
  pictureFrames.material = pictureFramesMaterial;

  var louvrePanels = game.assets["booth"].meshes[16];
  louvrePanels.isVisible = true;
  var louvrePanelsMaterial = new BABYLON.PBRMaterial(
    "louvrePanelsMaterial",
    this.getScene()
  );
  louvrePanelsMaterial.albedoTexture = new BABYLON.Texture(
    "./assets/BAKE/LOUVRE-PANELS.jpg",
    this.getScene()
  );
  louvrePanelsMaterial.metallic = 0;
  louvrePanelsMaterial.roughness = 1;
  louvrePanels.material = louvrePanelsMaterial;

  var louvreFrame = game.assets["booth"].meshes[17];
  louvreFrame.isVisible = true;
  var louvreFrameMaterial = new BABYLON.PBRMaterial(
    "louvreFrameMaterial",
    this.getScene()
  );
  louvreFrameMaterial.albedoTexture = new BABYLON.Texture(
    "./assets/BAKE/LOUVRE-FRAME.jpg",
    this.getScene()
  );
  louvreFrameMaterial.metallic = 0;
  louvreFrameMaterial.roughness = 1;
  louvreFrame.material = louvreFrameMaterial;

  var logoLight = game.assets["booth"].meshes[18];
  logoLight.isVisible = true;
  logoLight.material = uvMaterial;

  var logoChrome = game.assets["booth"].meshes[19];
  logoChrome.isVisible = true;
  logoChrome.material = uvMaterial;

  var lightRim = game.assets["booth"].meshes[20];
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

  var lightLight = game.assets["booth"].meshes[21];
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
    mainTextureFixedSize: 1024,
    blurKernelSize: 4,
  });
  gl.addIncludedOnlyMesh(lightLight);
  gl.addIncludedOnlyMesh(lightLight);
  gl.intensity = 0.7;

  var ledScreenTeabar = game.assets["booth"].meshes[22];
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
  teabarVideoMaterial.roughness = 1;
  teabarVideoMaterial.emissiveColor = new BABYLON.Color3.White();
  ledScreenTeabar.material = teabarVideoMaterial;
  this.getScene().onPointerObservable.add(function (evt1) {
    if (evt1.pickInfo.pickedMesh === ledScreenTeabar) {
      //console.log("picked");
      if (teabarVideoTexture.video.paused) teabarVideoTexture.video.play();
      else teabarVideoTexture.video.pause();
      console.log(teabarVideoTexture.video.paused ? "paused" : "playing");
    }
  }, BABYLON.PointerEventTypes.POINTERPICK);
  light.excludedMeshes.push(ledScreenTeabar);
  dl2.excludedMeshes.push(ledScreenTeabar);

  var ledScreenJapan = game.assets["booth"].meshes[23];
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
  japanVideoMaterial.diffuseTexture = japanVideoTexture;
  japanVideoMaterial.roughness = 1;
  japanVideoMaterial.emissiveColor = new BABYLON.Color3.White();
  ledScreenJapan.material = japanVideoMaterial;
  this.getScene().onPointerObservable.add(function (evt2) {
    if (evt2.pickInfo.pickedMesh === ledScreenJapan) {
      //console.log("picked");
      if (japanVideoTexture.video.paused) japanVideoTexture.video.play();
      else japanVideoTexture.video.pause();
      console.log(japanVideoTexture.video.paused ? "paused" : "playing");
    }
  }, BABYLON.PointerEventTypes.POINTERPICK);
  light.excludedMeshes.push(ledScreenJapan);
  dl2.excludedMeshes.push(ledScreenJapan);

  var ledScreenBuilding = game.assets["booth"].meshes[24];
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
  dl2.excludedMeshes.push(ledScreenBuilding);

  var ledBackwallTeabar = game.assets["booth"].meshes[25];
  ledBackwallTeabar.isVisible = true;
  var ledBackwallTeabarMaterial = new BABYLON.StandardMaterial(
    "ledBackwallTeabarMaterial",
    this.getScene()
  );
  ledBackwallTeabarMaterial.diffuseTexture = new BABYLON.Texture(
    "./assets/BAKE/UV.jpg",
    this.getScene()
  );
  ledBackwallTeabar.material = ledBackwallTeabarMaterial;

  var ledBackwallJapan = game.assets["booth"].meshes[26];
  ledBackwallJapan.isVisible = true;
  var ledBackwallJapanMaterial = new BABYLON.StandardMaterial(
    "ledBackwallJapanMaterial",
    this.getScene()
  );
  ledBackwallJapanMaterial.diffuseTexture = new BABYLON.Texture(
    "./assets/BAKE/UV.jpg",
    this.getScene()
  );
  ledBackwallJapan.material = ledBackwallJapanMaterial;

  var horizon = game.assets["booth"].meshes[27];
  horizon.isVisible = true;
  var horizonMaterial = new BABYLON.StandardMaterial(
    "horizonMaterial",
    this.getScene()
  );
  horizonMaterial.opacityTexture = new BABYLON.Texture(
    "./assets/C4D/tex/Pattern_1024_tiny.png",
    this.getScene()
  );
  horizonMaterial.opacityTexture.uScale = 20.0;
  horizonMaterial.opacityTexture.vScale = 5.0;
  horizon.material = horizonMaterial;

  var hangingLampsShade = game.assets["booth"].meshes[28];
  hangingLampsShade.isVisible = true;
  hangingLampsShade.position.x = -7.529;
  hangingLampsShade.position.z = 16.778;
  var hangingLampsShadeMaterial = new BABYLON.PBRMaterial(
    "hangingLampsShadeMaterial",
    this.getScene()
  );
  hangingLampsShadeMaterial.emissiveTexture = new BABYLON.Texture(
    "./assets/BAKE/LAMPSHADE.png",
    this.getScene()
  );
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

  var hangingLampsBaseRim = game.assets["booth"].meshes[29];
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

  var floorUF = game.assets["booth"].meshes[30];
  floorUF.isVisible = true;
  floorUF.checkCollisions = true;
  var floorUFMaterial = new BABYLON.PBRMaterial(
    "floorUFMaterial",
    this.getScene()
  );
  floorUFMaterial.albedoTexture = new BABYLON.Texture(
    "./assets/BAKE/FLOOR-UF.jpg",
    this.getScene()
  );
  floorUFMaterial.albedoTexture.vOffset = 0.0015;
  floorUFMaterial.metallic = 0.3;
  floorUFMaterial.roughness = 0.7;
  floorUF.material = floorUFMaterial;
  light.excludedMeshes.push(floorUF);

  var floorGlass = game.assets["booth"].meshes[31].clone(
    "FLOOR-GLASS-RIGHT-POSITION"
  );
  floorGlass.isVisible = true;
  floorGlass.checkCollisions = true;
  dl2.excludedMeshes.push(floorGlass);

  var floorBase = game.assets["booth"].meshes[32];
  floorBase.isVisible = true;
  var floorBaseMaterial = new BABYLON.StandardMaterial(
    "floorBaseMaterial",
    this.getScene()
  );
  floorBaseMaterial.diffuseColor = BABYLON.Color3.White();
  floorBase.material = floorBaseMaterial;

  var earchair = game.assets["booth"].meshes[33];
  earchair.isVisible = true;
  earchair.scaling = new BABYLON.Vector3(1.075, 1.075, 1.075);
  earchair.position.x = -10.226;
  earchair.position.y = -0.25;
  earchair.position.z = 7.253;
  earchair.rotation.y = -1.0;
  var earchairMaterial = new BABYLON.PBRMaterial(
    "earchairMaterial",
    this.getScene()
  );
  earchairMaterial.metallic = 0.3;
  earchairMaterial.roughness = 0.7;
  earchairMaterial.albedoTexture = new BABYLON.Texture(
    "./assets/BAKE/EARCHAIR.jpg",
    this.getScene()
  );
  earchair.material = earchairMaterial;
  light.excludedMeshes.push(earchair);

  var earchair1 = earchair.createInstance("earchair1");
  //earchair1.scaling = new BABYLON.Vector3(1.075,1.075,1.075);
  earchair1.position.x = -9.098;
  earchair1.position.y = -0.25;
  earchair1.position.z = 8.039;
  earchair1.rotation.y = -0.05;

  var earchair2 = earchair.createInstance("earchair2");
  //earchair2.scaling = new BABYLON.Vector3(1.075,1.075,1.075);
  earchair2.position.x = -7.572;
  earchair2.position.y = -0.25;
  earchair2.position.z = 8.976;
  earchair2.rotation.y = -0.7;

  var earchair3 = earchair.createInstance("earchair3");
  //earchair3.scaling = new BABYLON.Vector3(1.075,1.075,1.075);
  earchair3.position.x = -6.316;
  earchair3.position.y = -0.25;
  earchair3.position.z = 9.535;
  earchair3.rotation.y = -0.1;

  var earchair4 = earchair.createInstance("earchair4");
  //earchair4.scaling = new BABYLON.Vector3(1.075,1.075,1.075);
  earchair4.position.x = -4.422;
  earchair4.position.y = -0.25;
  earchair4.position.z = 10.379;
  earchair4.rotation.y = -0.8;

  var earchair5 = earchair.createInstance("earchair5");
  //earchair5.scaling = new BABYLON.Vector3(1.075,1.075,1.075);
  earchair5.position.x = -3.095;
  earchair5.position.y = -0.25;
  earchair5.position.z = 10.739;
  earchair5.rotation.y = 0.2;

  var earchair6 = earchair.createInstance("earchair6");
  //earchair6.scaling = new BABYLON.Vector3(1.075,1.075,1.075);
  earchair6.position.x = -8.768;
  earchair6.position.y = -0.25;
  earchair6.position.z = 12.717;
  earchair6.rotation.y = -1.0;

  var earchair7 = earchair.createInstance("earchair7");
  //earchair7.scaling = new BABYLON.Vector3(1.075,1.075,1.075);
  earchair7.position.x = -2.692;
  earchair7.position.y = -0.25;
  earchair7.position.z = 13.988;
  earchair7.rotation.y = -1.0;

  var chairRest = game.assets["booth"].meshes[34];
  chairRest.isVisible = true;
  chairRest.position.x = 6.92;
  chairRest.position.z = 11.308;
  var chairRestMaterial = new BABYLON.PBRMaterial(
    "chairRestMaterial",
    this.getScene()
  );
  chairRestMaterial.albedoTexture = new BABYLON.Texture(
    "./assets/BAKE/CHAIR-REST.jpg",
    this.getScene()
  );
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

  var chairFrame = game.assets["booth"].meshes[35];
  chairFrame.isVisible = true;
  chairFrame.scaling = new BABYLON.Vector3(1, 1, 1);
  chairFrame.position.x = 6.92;
  chairFrame.position.z = 11.308;
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
  chairFrame1.position.x = 6.92;
  chairFrame1.position.z = 11.957;

  var chairFrame2 = chairFrame.createInstance("chairFrame2");
  chairFrame2.isVisible = true;
  chairFrame2.position.x = 6.92;
  chairFrame2.position.z = 12.673;

  var chairFrame3 = chairFrame.createInstance("chairFrame3");
  chairFrame3.isVisible = true;
  chairFrame3.position.x = 6.92;
  chairFrame3.position.z = 13.323;

  var chairFrame4 = chairFrame.createInstance("chairFrame4");
  chairFrame4.isVisible = true;
  chairFrame4.position.x = 8.139;
  chairFrame4.position.z = 13.323;
  chairFrame4.rotation.y = Math.PI;

  var chairFrame5 = chairFrame.createInstance("chairFrame5");
  chairFrame5.isVisible = true;
  chairFrame5.position.x = 8.139;
  chairFrame5.position.z = 12.673;
  chairFrame5.rotation.y = Math.PI;

  var chairFrame6 = chairFrame.createInstance("chairFrame6");
  chairFrame6.isVisible = true;
  chairFrame6.position.x = 8.139;
  chairFrame6.position.z = 11.957;
  chairFrame6.rotation.y = Math.PI;

  var chairFrame7 = chairFrame.createInstance("chairFrame7");
  chairFrame7.isVisible = true;
  chairFrame7.position.x = 8.139;
  chairFrame7.position.z = 11.308;
  chairFrame7.rotation.y = Math.PI;

  var carpets = game.assets["booth"].meshes[36];
  carpets.isVisible = true;
  var carpetsMaterial = new BABYLON.PBRMaterial(
    "carpetsMaterial",
    this.getScene()
  );
  carpetsMaterial.albedoTexture = new BABYLON.Texture(
    "./assets/BAKE/CARPETS.jpg",
    this.getScene()
  );
  carpetsMaterial.metallic = 0.4;
  carpetsMaterial.roughness = 0.6;
  carpets.material = carpetsMaterial;

  var boothWhitesAll = game.assets["booth"].meshes[37];
  boothWhitesAll.isVisible = true;
  boothWhitesAll.checkCollisions = true;
  var boothWhitesAllMaterial = new BABYLON.PBRMaterial(
    "boothWhitesAllMaterial",
    this.getScene()
  );
  boothWhitesAllMaterial.albedoTexture = new BABYLON.Texture(
    "./assets/BAKE/BOOTH-WHITES-ALL.jpg",
    this.getScene()
  );
  boothWhitesAllMaterial.metallic = 0;
  boothWhitesAllMaterial.roughness = 1;
  boothWhitesAll.material = boothWhitesAllMaterial;
  dl2.excludedMeshes.push(boothWhitesAll);

  var boothGlass = game.assets["booth"].meshes[38];
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

  var benches = game.assets["booth"].meshes[39];
  benches.isVisible = true;
  var benchesMaterial = new BABYLON.PBRMaterial(
    "benchesMaterial",
    this.getScene()
  );
  benchesMaterial.metallic = 0.3;
  benchesMaterial.roughness = 0.7;
  benchesMaterial.albedoTexture = new BABYLON.Texture(
    "./assets/BAKE/BENCHES.jpg",
    this.getScene()
  );
  /* benchesMaterial.bumpTexture = new BABYLON.Texture("./assets/BAKE/BENCHES_NOR.jpg", this.getScene());
  benchesMaterial.bumpTexture.level = 0.1; */
  benches.material = benchesMaterial;
  dl2.excludedMeshes.push(benches);

  var barStone = game.assets["booth"].meshes[40];
  barStone.isVisible = true;
  var barStoneMaterial = new BABYLON.PBRMaterial(
    "barStoneMaterial",
    this.getScene()
  );
  barStoneMaterial.albedoTexture = new BABYLON.Texture(
    "./assets/BAKE/BAR-STONE.jpg",
    this.getScene()
  );
  barStoneMaterial.metallic = 0.3;
  barStoneMaterial.roughness = 0.7;
  barStone.material = barStoneMaterial;

  var barFrame = game.assets["booth"].meshes[41];
  barFrame.isVisible = true;
  var barFrameMaterial = new BABYLON.PBRMaterial(
    "barFrameMaterial",
    this.getScene()
  );
  barFrameMaterial.albedoTexture = new BABYLON.Texture(
    "./assets/BAKE/BAR-FRAME.jpg",
    this.getScene()
  );
  barFrameMaterial.metallic = 0.3;
  barFrameMaterial.roughness = 0.7;
  barFrame.material = barFrameMaterial;

  var armchairBody = game.assets["booth"].meshes[42];
  armchairBody.isVisible = true;
  armchairBody.scaling = new BABYLON.Vector3(1.075, 1.075, 1.075);
  armchairBody.position.x = -7.794;
  armchairBody.position.y = -0.25;
  armchairBody.position.z = 13.525;
  armchairBody.rotation.y = -0.0;
  var armchairBodyMaterial = new BABYLON.PBRMaterial(
    "armchairBodyMaterial",
    this.getScene()
  );
  armchairBodyMaterial.metallic = 0.3;
  armchairBodyMaterial.roughness = 0.7;
  armchairBodyMaterial.albedoTexture = new BABYLON.Texture(
    "./assets/BAKE/ARMCHAIR-BODY.jpg",
    this.getScene()
  );
  armchairBody.material = armchairBodyMaterial;

  var armchairBody1 = armchairBody.createInstance("armchairBody1");
  armchairBody1.position.x = -7.294;
  armchairBody1.position.y = -0.25;
  armchairBody1.position.z = 11.954;
  armchairBody1.rotation.y = -0.0;

  var armchairBody2 = armchairBody.createInstance("armchairBody2");
  armchairBody2.position.x = -3.427;
  armchairBody2.position.y = -0.25;
  armchairBody2.position.z = 12.934;
  armchairBody2.rotation.y = -0.0;

  var armchairBody3 = armchairBody.createInstance("armchairBody3");
  armchairBody3.position.x = -4.31;
  armchairBody3.position.y = -0.25;
  armchairBody3.position.z = 14.321;
  armchairBody3.rotation.y = -0.0;

  var armchairBase = game.assets["booth"].meshes[43];
  armchairBase.isVisible = true;
  armchairBase.scaling = new BABYLON.Vector3(1.075, 1.075, 1.075);
  armchairBase.position.x = -7.794;
  armchairBase.position.y = -0.25;
  armchairBase.position.z = 13.525;
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
  armchairBase1.position.y = -0.25;
  armchairBase1.position.z = 11.954;

  var armchairBase2 = armchairBase.createInstance("armchairBase2");
  armchairBase2.position.x = -3.427;
  armchairBase2.position.y = -0.25;
  armchairBase2.position.z = 12.934;

  var armchairBase3 = armchairBase.createInstance("armchairBase3");
  armchairBase3.position.x = -4.31;
  armchairBase3.position.y = -0.25;
  armchairBase3.position.z = 14.321;

  var colliderStairs = game.assets["booth"].meshes[44];
  colliderStairs.isVisible = false;
  colliderStairs.material = glassMaterial;
  colliderStairs.checkCollisions = true;

  var noncolliderBoothGlass = game.assets["booth"].meshes[45];
  noncolliderBoothGlass.isVisible = true;
  noncolliderBoothGlass.material = glassMaterial;

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

  var mirrorStageMaterial = new BABYLON.StandardMaterial(
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
  mirrorStageMaterial.reflectionTexture.adaptiveBlurKernel = 150;
  stage.material = mirrorStageMaterial;

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
  ];
  mirrorFloorMaterial.reflectionTexture.level = 0.15;
  mirrorFloorMaterial.reflectionTexture.adaptiveBlurKernel = 2;
  floorGlass.material = mirrorFloorMaterial;

  const shadowGenerator = new BABYLON.ShadowGenerator(1024, dl2);
  shadowGenerator.addShadowCaster(earchair, true);
  shadowGenerator.addShadowCaster(earchair1, true);
  shadowGenerator.addShadowCaster(earchair2, true);
  shadowGenerator.addShadowCaster(earchair3, true);
  shadowGenerator.addShadowCaster(earchair4, true);
  shadowGenerator.addShadowCaster(earchair5, true);
  shadowGenerator.addShadowCaster(earchair6, true);
  shadowGenerator.addShadowCaster(earchair7, true);
  shadowGenerator.addShadowCaster(tableSquare, true);
  shadowGenerator.addShadowCaster(boothWhitesAll, true);
  floorUF.receiveShadows = true;
  shadowGenerator.useBlurExponentialShadowMap = true;
  /* shadowGenerator.useBlurCloseExponentialShadowMap = true; */
  shadowGenerator.useKernelBlur = true;
  shadowGenerator.blurKernel = 10;
  shadowGenerator.blurScale = 8;
};

// object is a GameObject
Booth.prototype = Object.create(GameObject.prototype);

// its constructor is the 'Booth' function above
Booth.prototype.constructor = Booth;
