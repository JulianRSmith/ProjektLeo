////////////////////////////////////////////////////////////////////////////////
//                               Main.js                                      //
////////////////////////////////////////////////////////////////////////////////

// Set up game enviornemnt
var game = new Phaser.Game(screenWidth, viewportHeight, Phaser.AUTO, 'game-viewport');

// Game States
game.state.add('STATE_BOOT', STATE_BOOT);
game.state.add('STATE_LOAD', STATE_LOAD);
game.state.add('STATE_MENU', STATE_MENU);
game.state.add('STATE_PLAY', STATE_PLAY);
game.state.add('STATE_CHAR', STATE_CHAR);
game.state.add('STATE_LOBBY', STATE_LOBBY);

// Call boot state
game.state.start('STATE_BOOT');