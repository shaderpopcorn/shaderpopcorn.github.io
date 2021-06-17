Camera = function (game, scene, canvas) {
    this.game = game;
    this.scene = scene;
    this.canvas = canvas;

var isMobile = {
    Android: function () { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
    any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
  };



  var camera;
  if (isMobile.any()) {
    //alert('Mobile');    
    camera = new BABYLON.VirtualJoysticksCamera(
      "VJC",
      new BABYLON.Vector3(-5, 5.5, 13),
      this.scene
    );
  } else {
    //alert('PC');
    camera = new BABYLON.FreeCamera(
      "UC",
      new BABYLON.Vector3(0, 1.5, -14),
      this.scene
    );
    camera.keysUp.push(87); //WASD controls
    camera.keysDown.push(83);
    camera.keysLeft.push(65);
    camera.keysRight.push(68);
  }

  camera.setTarget(BABYLON.Vector3.Zero());
  camera.inertia = 0.2;
  camera.speed = 1;
  camera.angularSensibility = 500;
  camera.fov = 1;
  camera.checkCollisions = true;
  camera.applyGravity = true;
  camera.minZ = 0.1;
  camera.ellipsoid = new BABYLON.Vector3(0.25, 2.5, 0.25);
  camera.ellipsoidOffset = new BABYLON.Vector3(0, 3.3, 0);
  camera.attachControl(this.canvas, true);



  var cameraGui = new BABYLON.FreeCamera(
    "UC",
    new BABYLON.Vector3(0, 1.5, -14),
    this.scene
  );
  cameraGui.keysUp.push(87); //WASD controls
  cameraGui.keysDown.push(83);
  cameraGui.keysLeft.push(65);
  cameraGui.keysRight.push(68);

  cameraGui.setTarget(BABYLON.Vector3.Zero());
  cameraGui.inertia = 0.2;
  cameraGui.speed = 1;
  cameraGui.angularSensibility = 500;
  cameraGui.fov = 1;
  cameraGui.checkCollisions = true;
  cameraGui.applyGravity = true;
  cameraGui.minZ = 0.1;
  cameraGui.ellipsoid = new BABYLON.Vector3(0.25, 1.5, 0.25);
  cameraGui.ellipsoidOffset = new BABYLON.Vector3(0, 1.3, 0);
  cameraGui.attachControl(this.canvas, true);
  cameraGui.layerMask = 0x10000000;



  var cameraTC = new BABYLON.TouchCamera(
    "TC",
    new BABYLON.Vector3(-5, 5.5, 13),
    this.scene
  );

  cameraTC.setTarget(BABYLON.Vector3.Zero());
  cameraTC.inertia = 0.2;
  cameraTC.speed = 1;
  cameraTC.angularSensibility = 500;
  cameraTC.fov = 1;
  cameraTC.checkCollisions = true;
  cameraTC.applyGravity = true;
  cameraTC.minZ = 0.1;
  cameraTC.ellipsoid = new BABYLON.Vector3(0.25, 1.5, 0.25);
  cameraTC.ellipsoidOffset = new BABYLON.Vector3(0, 1.3, 0);
  //cameraTC.attachControl(this.canvas, true);


  
  return {camera, cameraGui, cameraTC};
}