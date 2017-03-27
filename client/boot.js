////////////////////////////////////////////////////////////////////////////////
//                               Boot.js                                      //
////////////////////////////////////////////////////////////////////////////////

var bootState = {
    
    create: function () {
        
        // Start phaser pysics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Call load state
        game.state.start('load');
        
    }
    
}