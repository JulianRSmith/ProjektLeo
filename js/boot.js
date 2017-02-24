////////////////////////////////////////////////////////////////////////////////
//                               Boot.js                                      //
////////////////////////////////////////////////////////////////////////////////

var bootState = {
    
    create: function () {
        
        // Start phaser pysics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        console.log("Physics - Loaded");
        
        // Call load state
        game.state.start('load');
        
    }
    
}