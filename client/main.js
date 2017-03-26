////////////////////////////////////////////////////////////////////////////////
//                               Main.js                                      //
////////////////////////////////////////////////////////////////////////////////


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