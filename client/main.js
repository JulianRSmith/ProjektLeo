////////////////////////////////////////////////////////////////////////////////
//                               Main.js                                      //
////////////////////////////////////////////////////////////////////////////////

// Get the width of the users screen
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

// Keep these values just for future access based on their name
var viewportWidth = screenWidth;
var viewportHeight = 600;

// The width of the game itself
var gameWidth = 1920;
// The buffer height of the play area from the bottom
var gameHeightBuffer = 50;
// The total screen height including the buffer
var gameHeight = viewportHeight - gameHeightBuffer;

// Set up game enviornemnt
var game = new Phaser.Game(screenWidth, viewportHeight, Phaser.AUTO, 'gameViewpoint');

// Game States
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('char', charState);
game.state.add('lobby', lobbyState);

// Call boot state
game.state.start('boot');