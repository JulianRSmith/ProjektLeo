////////////////////////////////////////////////////////////////////////////////
//                               Play.js                                      //
////////////////////////////////////////////////////////////////////////////////

var playState = {
    
    create: function () {
        
        console.log("Game - Started")
        
        // Change background colour
        game.stage.backgroundColor = "#4488AA";
        
        // Enabled Keyboard
        this.keyboard = game.input.keyboard;
        // Call function that enables the keyboard
        this.enableKeyboard();
        
        // Apply global physics
        game.physics.arcade.gravity.y = 100;
        
        // Create Player Sprite
        player = createPlayer (32,'playerKingL');
    },
    
    update: function () {
        // Move player to the right
        if (this.key_Right.isDown) {
            player.x++;
            player.animations.play('right');
        }
        // Move player to the left
        else if (this.key_Left.isDown) {
            player.x--;
            player.animations.play('left');
        }
        // Otherwise, stop the animations
        else {
            player.animations.stop();
            player.frame = 1;
        }
    },
    
    // Displays debug information
    render: function () {
        game.debug.spriteInfo(player, 32, 32);
        game.debug.body(player);
    },
    
    //  Enable Keyboard Controls Function
    enableKeyboard: function () {
        this.key_Space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.key_Left  = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.key_Right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.key_Up    = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.key_Down  = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    }
}