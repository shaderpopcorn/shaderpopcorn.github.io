PasswordPage = function(game,scene,canvas,camera,cameraGui){

  var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

  advancedTexture.layer.layerMask = 0x10000000;

  var currentCamera = scene.activeCamera;
  /* var currentCamera = this.camera; */

  PasswordPage = function () {

    var kernel = 400.0;	
    var postProcess0 = new BABYLON.BlurPostProcess("Horizontal blur", new BABYLON.Vector2(1.0, 0), kernel, 1.0, camera);
    var postProcess1 = new BABYLON.BlurPostProcess("Vertical blur", new BABYLON.Vector2(0, 1.0), kernel, 1.0, camera);

    var number1;
    var input1 = new BABYLON.GUI.InputPassword();
    input1.width = "150px";
    input1.maxWidth = 0.2;
    input1.height = "40px";
    input1.text = "";
    input1.color = "white";
    input1.background = "green";
    input1.disableMobilePrompt = true;
    input1.onTextChangedObservable.add((kbInfo) => {
      number1 = input1.text;
      if (number1 == "empowerthedrive") {
        advancedTexture.dispose();
        postProcess0.dispose();
        postProcess1.dispose();
        cameraGui.dispose();
      }
      /* let key = kbInfo.currentKey;
      if (key < "0" || key > "9") {
        kbInfo.addKey = false;
      } else {
        number1 = input1.text;
        console.log(number);
        if (number1 == "empowerthedrive") {
          advancedTexture.dispose();
          postProcess0.dispose();
          postProcess1.dispose();
          gateGeometry.dispose();
          gateGeometry.checkCollisions = false;
          cameraTC.detachControl(canvas);
          currentCamera = this.camera;
          camera.attachControl(canvas, true);
        }
      } */
      
    });

    advancedTexture.addControl(input1);

    var keyboard = BABYLON.GUI.VirtualKeyboard.CreateDefaultLayout();

    //var keyboard = new BABYLON.GUI.VirtualKeyboard();
    keyboard.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    keyboard.top = "150px";
    /* keyboard.addKeysRow(["1", "2", "3"]);
    keyboard.addKeysRow(["4", "5", "6"]);
    keyboard.addKeysRow(["7", "8", "9"]);
    keyboard.addKeysRow(["\u2190", "0", "\u21B5"]); */
    advancedTexture.addControl(keyboard);
    keyboard.connect(input1);
  }

  PasswordPage();

}