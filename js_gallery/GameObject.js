var GameObject = function (name, game) {
  // call superclass BABYLON.Mesh
  BABYLON.Mesh.call(this, name, game.scene);

  this.game = game;
};

// object is a BABYLON.Mesh
GameObject.prototype = Object.create(BABYLON.Mesh.prototype);

// the constructor is the GameObject function above
GameObject.prototype.constructor = GameObject;
