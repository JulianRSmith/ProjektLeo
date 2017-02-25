var bootState = {
    
    create: function () {
        // Start phaser pysics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        var screenWidth = window.screen.width;
        console.log("Physics - Loaded");
        game.state.start('menu');
    }
    
}