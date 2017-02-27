////////////////////////////////////////////////////////////////////////////////
//                               Main.js                                      //
////////////////////////////////////////////////////////////////////////////////

// Get the width of the users screen
var screenWidth = window.screen.width;

// Set up game enviornemnt
var game = new Phaser.Game(screenWidth,600, Phaser.AUTO, 'gameViewpoint');

// Game States
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);

<<<<<<< HEAD:js/main.js
// Call boot state
game.state.start('boot');
=======
game.state.start('boot');
>>>>>>> d89087b5743e540ea744d69e5b139966f041ba8f:client/main.js
