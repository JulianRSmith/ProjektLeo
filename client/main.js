////////////////////////////////////////////////////////////////////////////////
//                               Main.js                                      //
////////////////////////////////////////////////////////////////////////////////

// Get the width of the users screen
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

// Set up game enviornemnt
var game = new Phaser.Game(screenWidth, 600, Phaser.AUTO, 'gameViewpoint');

// Game States
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
// game.state.add('play', playState);

// Call boot state
game.state.start('boot');