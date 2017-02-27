////////////////////////////////////////////////////////////////////////////////
//                               Play.js                                      //
////////////////////////////////////////////////////////////////////////////////

var playState = {
    
    create: function () {
        
        console.log("Game - Started")
        
        // Enabled Keyboard
        this.keyboard = game.input.keyboard;
        
        // Change background colour
        game.stage.backgroundColor = "#4488AA";
        
        game.physics.arcade.gravity.y = 100;
        // Create Player Sprite
        player = game.add.sprite(32,32,'playerKingL');
        // Enable physics for the sprite
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
        player.body.bounce.y = 0.8;
    },
    
    update: function () {
        // console.log("Game - Update")
    },
    
    render: function () {
        game.debug.spriteInfo(player, 32, 32);
    }
}