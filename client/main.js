////////////////////////////////////////////////////////////////////////////////
//                               Main.js                                      //
////////////////////////////////////////////////////////////////////////////////

// Get the width of the users screen
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

// Keep these values just for future access based on their name
var viewportWidth = screenWidth;
var viewportHeight = 600;

// Set up game enviornemnt
var game = new Phaser.Game(screenWidth, viewportHeight, Phaser.AUTO, 'gameViewpoint');

// Game States
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('char', charState);

// Call boot state
game.state.start('boot');