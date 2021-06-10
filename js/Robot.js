Robot = function(game, scene){
var robotBodyMaterial = new BABYLON.PBRMaterial(
    "robotBodyMaterial",
    scene
  );
  robotBodyMaterial.albedoColor = new BABYLON.Color3(1.0, 1.0, 1.0);
  robotBodyMaterial.metallic = 0.3;
  robotBodyMaterial.roughness = 0.7;
  robotBodyMaterial.backFaceCulling = false;

  var robotBody = game.assets["booth"].meshes[50];
  robotBody.isVisible = true;
  robotBody.material = robotBodyMaterial;

  var robotHeadMaterial = new BABYLON.PBRMaterial(
    "robotHeadMaterial",
    scene
  );
  robotHeadMaterial.albedoColor = new BABYLON.Color3(1.0, 1.0, 1.0);
  robotHeadMaterial.metallic = 0.3;
  robotHeadMaterial.roughness = 0.7;

  var robotHead = game.assets["booth"].meshes[49];
  robotHead.isVisible = true;
  robotHead.material = robotHeadMaterial;
  robotHead.parent = robotBody;

  /* var robotLabelMaterial = new BABYLON.PBRMaterial(
    "robotLabelMaterial",
    scene
  );
  //robotLabelMaterial.albedoColor = new BABYLON.Color3(0.5, 0.5, 1.0);
  robotLabelMaterial.albedoTexture = game.assets["informationTex"].texture;
  //robotLabelMaterial.albedoTexture.hasAlpha = true;
  //robotLabelMaterial.transparencyMode = BABYLON.Material.MATERIAL_ALPHABLEND;
  //robotLabelMaterial.useAlphaFromAlbedoTexture = true;
  robotLabelMaterial.metallic = 0.3;
  robotLabelMaterial.roughness = 0.7;

  var robotLabel = BABYLON.MeshBuilder.CreateSphere(
    "robotLabel",
    { segments: 10, diameter: 0.5 },
    scene
  );
  robotLabel.material = robotLabelMaterial;
  robotLabel.parent = robotHead; */

  // Create array of points to describe the curve
  var points = [];
  var n = 3000; // number of points
  var r = 10; //radius
  for (var i = 0; i < n + 1; i++) {
    points.push(
      new BABYLON.Vector3(
        (r + (r / 5) * Math.sin((4.25 * i * Math.PI) / n)) *
        Math.sin((2 * i * Math.PI) / n) -
        1.5,
        0,
        (r + (r / 20) * Math.sin((8 * i * Math.PI) / n)) *
        Math.cos((2 * i * Math.PI) / n) -
        2
      )
    );
  }

  //Draw the curve
  /* var track = BABYLON.MeshBuilder.CreateLines('track', {points: points}, scene);
  track.color = new BABYLON.Color3(0, 0, 0); */

  /* robotBody.position.y = 0.75; */
  robotHead.position.y = 1.75;
  robotBody.position.z = r;

  var path3d = new BABYLON.Path3D(points);
  var normals = path3d.getNormals();
  var theta = Math.acos(BABYLON.Vector3.Dot(BABYLON.Axis.Z, normals[0]));
  robotBody.rotate(BABYLON.Axis.Y, theta, BABYLON.Space.WORLD);
  var startRotation = robotBody.rotationQuaternion;

  var i = 0;
  /* var t = 0; */
  scene.registerAfterRender(function () {
    robotBody.position.x = points[i].x;
    robotBody.position.z = points[i].z;

    //robotBody.scaling.y = Math.sin(t)*0.15+0.75;
    //t += 0.01;

    theta = Math.acos(BABYLON.Vector3.Dot(normals[i], normals[i + 1]));
    var dir = BABYLON.Vector3.Cross(normals[i], normals[i + 1]).y;
    var dir = dir / Math.abs(dir);
    robotBody.rotate(BABYLON.Axis.Y, dir * theta, BABYLON.Space.WORLD);

    /* t += 0.01;
    robotLabel.rotation.y = t; */

    i = (i + 1) % (n - 1); //continuous looping

    if (i == 0) {
      robotBody.rotationQuaternion = startRotation;
    }
  });

  return {robotBody, robotHead};
}