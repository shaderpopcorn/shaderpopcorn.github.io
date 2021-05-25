var Label = function (game) {
  // call super class BABYLON.Mesh
  GameObject.call(this, "label", game);

  // GUI for info counter
  var anchor = new BABYLON.AbstractMesh("anchor", this.getScene());
    anchor.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
    anchor.position = new BABYLON.Vector3(6,3.5,-10);

    var manager = new BABYLON.GUI.GUI3DManager(this.getScene());
    var mainButton = new BABYLON.GUI.HolographicButton("See Features");
    manager.addControl(mainButton);
    mainButton.linkToTransformNode(anchor);
    
    mainButton.scaling.y = 0.5;
    mainButton.scaling.x = 2;
    
    mainButton.mesh.getChildren()[1].scaling.y = 3;
    mainButton.backMaterial.albedoColor = BABYLON.Color3.FromHexString("#a61e2f");
    //mainButton.backMaterial.alpha = 0.0;
    mainButton.mesh.isVisible = false;
    var mainButtonText = new BABYLON.GUI.TextBlock();
    mainButtonText.text = "INFO COUNTER";
    mainButtonText.fontWeight = "bold";
    mainButtonText.color = "white";
    mainButtonText.fontSize = 30;
    mainButton.content = mainButtonText;  

};

// object is a GameObject
Label.prototype = Object.create(GameObject.prototype);

// its constructor is the 'Label' function above
Label.prototype.constructor = Label;
