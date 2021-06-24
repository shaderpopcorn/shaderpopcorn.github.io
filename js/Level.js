Level = function (game) {
  this.scene = game.scene;
  this.game = game;

  // starting position in this level
  this.start = null;

};

// delete the current level
/* Level.prototype.dispose = function () {
  this.blocks.forEach(function (b) {
    b.dispose();
  });

  this.keys.forEach(function (k) {
    k.delete();
  });
}; */

// creates new map from matrix of ints
Level.Infiniti = function (number, game) {
  /* var level = new Level(game); */
  var booth = null;
  /* var label = null; */
  /* var password = null; */
  /* var robot = null; */
  /* var mobile = null; */
  var samples = null;
  if(number == 1){ 
    booth = new Booth(game); 
    /* label = new Label(game); */
    /* password = new Password(game); */
    /* robot = new Robot(game); */
    /* mobile = new Mobile(game); */
    samples = new Samples(game);
  }
  /* return level; */
};
