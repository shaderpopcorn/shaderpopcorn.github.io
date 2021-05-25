var Password = function (game) {
  // call super class BABYLON.Mesh
  GameObject.call(this, "gui", game);


  // GUI for VIP access
  function passwordVIP(){
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    

    var number;
    var input = new BABYLON.GUI.InputPassword();
    input.width = "150px";
    input.maxWidth = 0.2;
    input.height = "40px";
    input.text = "";
    input.color = "white";
    input.background = "green";
    input.onTextChangedObservable.add((kbInfo) => {
      let key = kbInfo.currentKey;
      if (key < "0" || key > "9") {
        kbInfo.addKey = false;
      }else{
        number = input.text;
        console.log(number);
        if(number == "123"){
          console.log('hello');
          advancedTexture.dispose();
          test.dispose();
          test.checkCollisions = false;
        }
      }
    });

    advancedTexture.addControl(input);    

    var keyboard = BABYLON.GUI.VirtualKeyboard.CreateDefaultLayout();
    keyboard.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    advancedTexture.addControl(keyboard);

    keyboard.connect(input);
  }
  
  var test = game.assets["booth"].meshes[44]; 
  console.log(test.uniqueId);
  
  var testCam = game.scene.activeCamera;
  testCam.onCollide = function (colMesh) {
		if (colMesh.uniqueId === test.uniqueId) {
      passwordVIP();
		}
	}


};

// object is a GameObject
Password.prototype = Object.create(GameObject.prototype);

// its constructor is the 'Password' function above
Password.prototype.constructor = Password;
