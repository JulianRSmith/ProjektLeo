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

        // Call load state
        game.state.start('LoadState');

    }

}