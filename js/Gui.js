Gui = function(game,scene,canvas,camera,cameraTC){

  var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

  var currentCamera = scene.activeCamera;
  /* var currentCamera = this.camera; */

  var gateGeometry = game.assets["booth"].meshes[47];
  /* console.log(gateGeometry.uniqueId); */

  // GUI for VIP access
  PasswordVIP = function () {

    var number;
    var input = new BABYLON.GUI.InputPassword();
    input.width = "150px";
    input.maxWidth = 0.2;
    input.height = "40px";
    input.text = "";
    input.color = "white";
    input.background = "green";
    input.disableMobilePrompt = true
    input.onTextChangedObservable.add((kbInfo) => {
      let key = kbInfo.currentKey;
      if (key < "0" || key > "9") {
        kbInfo.addKey = false;
      } else {
        number = input.text;
        console.log(number);
        if (number == "123") {
          advancedTexture.dispose();
          gateGeometry.dispose();
          gateGeometry.checkCollisions = false;
          cameraTC.detachControl(canvas);
          currentCamera = this.camera;
          camera.attachControl(canvas, true);
        }
      }
    });

    advancedTexture.addControl(input);

    var keyboard = new BABYLON.GUI.VirtualKeyboard();
    keyboard.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    keyboard.top = "150px";
    keyboard.addKeysRow(["1", "2", "3"]);
    keyboard.addKeysRow(["4", "5", "6"]);
    keyboard.addKeysRow(["7", "8", "9"]);
    keyboard.addKeysRow(["\u2190", "0", "\u21B5"]);
    advancedTexture.addControl(keyboard);
    keyboard.connect(input);
  }

  //PasswordVIP();

  currentCamera.onCollide = function (colMesh) {
    if (colMesh.uniqueId === gateGeometry.uniqueId) {
      if (currentCamera.name === 'VJC') {
        camera.detachControl(canvas);
        currentCamera = cameraTC;
        PasswordVIP();
        console.log('CURRENT CAMERA DURING COLLISION ' + currentCamera.name);
      } else if (currentCamera.name === 'UC') {
        PasswordVIP();
      }
    }
  }
}