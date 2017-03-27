////////////////////////////////////////////////////////////////////////////////
//                               Play.js                                      //
////////////////////////////////////////////////////////////////////////////////

var STATE_PLAY = {
    
    create: function () {
        
        console.log("Game - Started")
        
        // Set game world size
        game.world.setBounds(0, 0, gameWidth, viewportHeight);
        
        // Change background colour
        // game.stage.backgroundColor = "#4488AA";
        var gameBackground = game.add.sprite(0, 0, 'battleBG');
        
        mainBattle = game.add.audio('mainBattle');
        mainBattle.loop = true;
        mainBattle.play();
        
        // Create the game's ground
        gameFloor = createGameGround();
        
        // Create the health bar on screen
        healthBar = createHealthBar(userChar);
        
        // Add characters name
        addCharNames(userChar);
        
        // Enabled Keyboard
        this.keyboard = game.input.keyboard;
        // Call function that enables the keyboard
        this.enableKeyboard();
        
        // Apply global physics
        game.physics.arcade.gravity.y = 700;
        
        // Create Player Sprite
        player = createPlayer (32,userChar);
        player.frame = 1;
        
        // Make the camera follow the player
        game.camera.follow(player);
        
        var buttonMenu = createLabelButton('Menu', 138, viewportHeight - 70, '#FFFFFF', "bGreenNormal", returnMenuOnClick, labelHover, labelOut);
    },
    
    update: function () {
        
        // Don't allow the gmae floor and the player to overlap each other
        game.physics.arcade.collide(player, gameFloor);
        
        // Move player to the right
        if (this.key_Right.isDown) {
            player.x+= 6;
            player.animations.play('right');
            console.log("Player Move Right")
        }
        // Move player to the left
        else if (this.key_Left.isDown) {
            player.x-= 6;
            player.animations.play('left');
            console.log("Player Move Left")
        }
        else if(this.key_A.isDown) {
            console.log("Player Punches!")
            player.animations.play('attack');
            if (game.physics.arcade.collide(player, player2)) {
                //enemy health down
            }
        }
        else if(this.key_S.isDown) {
            console.log("Player Kicks!")
            if (game.physics.arcade.collide(player, player2)) {
                //enemy health down
            }
        }
        else {
            player.animations.stop();
        }
        
        // Make the player jump only if they're touching the ground
        if (this.key_Up.isDown && player.body.touching.down) {
            player.body.velocity.y = -400;
            console.log("Player Jump")
        }
        if (this.key_Space.isDown) {
            hit--;
            if (hit >= 0) {
                healthBar.getAt(0).body.setSize(hit,30,0,0);
                console.log("Player Hit!")
            }
        } 
    
    },
    
    // Displays debug information
    render: function () {
        // game.debug.spriteInfo(player, 32, 32);
        // game.debug.body(player);
        healthBar.forEachAlive(this.renderGroup, this);
        // game.debug.body(gameFloor);
        
    },
    
    //  Enable Keyboard Controls Function
    enableKeyboard: function () {
        this.key_Space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.key_Left  = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.key_Right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.key_Up    = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.key_Down  = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.key_A = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.key_S = game.input.keyboard.addKey(Phaser.Keyboard.S);
    },
    
    renderGroup: function(member) {    
        game.debug.body(member);
    }
}