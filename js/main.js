////////////////////////////////////////////////////////////////////////////////
//                               Main.js                                      //
////////////////////////////////////////////////////////////////////////////////

// Get the width of the users screen
var screenWidth = window.screen.width;
// Set up game enviornemnt
var game = new Phaser.Game(screenWidth,600, Phaser.AUTO, 'gameViewpoint');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);

game.state.start('boot');