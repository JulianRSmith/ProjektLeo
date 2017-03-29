////////////////////////////////////////////////////////////////////////////////
//                               Main.js                                      //
////////////////////////////////////////////////////////////////////////////////

// Set up game enviornemnt
var game = new Phaser.Game(ScreenData.screenWidth, ScreenData.viewportHeight, Phaser.AUTO, 'game-viewport');

// Game States
game.state.add('BootState', BootState);
game.state.add('LoadState', LoadState);
game.state.add('MenuState', MenuState);
game.state.add('PlayState', PlayState);
game.state.add('CharState', CharState);
game.state.add('LobbyState', LobbyState);

// Call boot state
game.state.start('BootState');