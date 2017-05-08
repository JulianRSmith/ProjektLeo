/************************************************************

    BootState.js

    Initialises the game and physics engine before load.

************************************************************/

var BootState = {

    create: function () {

        // For debug
        console.log("BootState::create() : Running");

        // Start phaser pysics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Allow game to render in background
        game.stage.disableVisibilityChange = true;

        // Call load state
        game.state.start('LoadState');

    }

}