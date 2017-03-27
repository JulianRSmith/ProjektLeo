////////////////////////////////////////////////////////////////////////////////
//                               Boot.js                                      //
////////////////////////////////////////////////////////////////////////////////

var STATE_BOOT = {

    create: function () {

        // Start phaser pysics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Call load state
        game.state.start('STATE_LOAD');

    }

}