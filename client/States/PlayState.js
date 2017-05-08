/************************************************************

    PlayState.js

    State for the main game.

    // TODO:
        Refer to CharState.js for most of what is needed.
        In this state, we should setup listeners for data
        incoming to the client which was not invoked as this
        is needed to send and get updates on the other player.

        This state should also support single player (for debug)
        and also to add an extra game mechanic.
    
************************************************************/

var PlayState = {
    
    secTimer: 0,
    userChar: 0,
    buttonMenu: 0,
    aiActivated: 0,
    singlePlayer: 0,
    otherPlayerChar: 0,
    opponent: 0,
    delay: 0,
    key: 0,

    p1Debug: 0,
    p2Debug: 0,

    otherDebugBox: 0,
    
    create: function () {
        
        PlayerData.currentState = "PlayState";

        // Set game world size
        game.world.setBounds(0, 0, ScreenData.gameWidth, ScreenData.viewportHeight);
        
        // Change background colour
        // game.stage.backgroundColor = "#4488AA";
        var gameBackground = game.add.sprite(0, 0, 'battleBackground');
        
        AudioManager.gameBattleTheme.loop = true;
        //AudioManager.gameBattleTheme.play();
        
        // Create the game's ground
        gameFloor = createGameGround();
        
        // Get users chosen character
        this.userChar = PlayerData.getSelectedCharacter();
        console.log("CHOSEN = " + this.userChar)
        
        if (!NetworkManager.connected() && LobbyData.lobby == 0){
            this.singlePlayer = true;
            this.otherPlayerChar = PlayerData.generateEnemyPlayer(this.userChar)
            console.log("Single Player Game = " + this.singlePlayer)
        } else {
            console.log("Multiplayer Game Started")
        }
        
        // Create the health bar on screen
        healthBar = createHealthBar(this.userChar);
        
        // Add characters name
        addCharNames(this.userChar, (this.singlePlayer ? this.otherPlayerChar : NetPlayer.playerchar));
        
        // Enabled Keyboard
        this.keyboard = game.input.keyboard;
        // Call function that enables the keyboard
        this.enableKeyboard();
        
        // Apply global physics
        game.physics.arcade.gravity.y = 700;
        
        // Create Player Sprite
        player = createPlayer (32, this.userChar);
        player.frame = 1;
        
        // NOT WORKING IN MULTIPLAYER.
        PlayState.opponent = createPlayer(ScreenData.gameWidth-32, (this.singlePlayer ? this.otherPlayerChar : NetPlayer.playerchar));

        // OPPONENT DOES NOT WORK WHEN CONNECTED.
        // AGAIN, NEED SOMEONE TO FIX THIS AS I HAVE NO CLUE WHY!
        PlayState.otherDebugBox = game.add.sprite(-100, -100, "otherPlayerDebug", { boundsAlignH: "center", boundsAlignV: "middle" });
        
        // Make the camera follow the player
        game.camera.follow(player);
        
        PlayState.p1Debug = game.add.text(240, 32, 'P1 DEBUGTEXT', {font: "14px Calibri", fill: "#FFFFFF", backgroundColor: "#333333", align: "center", boundsAlignH: "center", boundsAlignV: "middle"});
        PlayState.p2Debug = game.add.text(240, 54, 'P2 DEBUGTEXT', {font: "14px Calibri", fill: "#FFFFFF", backgroundColor: "#333333", align: "center", boundsAlignH: "center", boundsAlignV: "middle"});

        // this.buttonMenu = GUIManager.createButton('Menu', ScreenData.screenWidth, ScreenData.viewportHeight - 70, '#FFFFFF', "buttonGreenNormal", this.menuOnClick);
    },
    
    update: function () {
        
        // Game time
        this.secTimer = this.game.time.totalElapsedSeconds().toFixed(2);
        
        if (!this.aiActivated) {
            this.checkAiHelp();
        }
        
        // Don't allow the gmae floor and the player to overlap each other
        game.physics.arcade.collide(player, gameFloor);
        // Don't allow the gmae floor and the player to overlap each other
        game.physics.arcade.collide(PlayState.opponent, gameFloor);
        
        // Move player to the right
        if (this.key_Right.isDown) {
            if (this.key != "right"){
                this.delay = true;
                this.key = "right";
            } else {
                this.key = "right";
            }
            player.x+= 6;
            player.animations.play('right');
        }
        // Move player to the left
        else if (this.key_Left.isDown) {
            if (this.key != "left"){
                this.delay = true;
                this.key = "left";
            } else {
                this.key = "left";
            }
            player.x-= 6;
            player.animations.play('left');
        }
        else if(this.key_A.isDown) {
            player.animations.play('attack');
            this.game.physics.arcade.overlap(player, PlayState.opponent, this.hit, null, this);
        }
        else if(this.key_S.isDown) {
            console.log("Player Kicks!")
            this.game.physics.arcade.overlap(player, PlayState.opponent, this.hit, null, this);
        }
        else {
            player.animations.stop();
        }
        
        // Make the player jump only if they're touching the ground
        if (this.key_Up.isDown && player.body.touching.down) {
            player.body.velocity.y = -400;
            console.log("Player Jump")
        }
        
        // If we're in a network game, send our position to the server
        // It would be better to track what keys are pressed and have the server
        // do the magic, but for the sake of reducing dev time, this works.
        if(NetworkManager.connected()) { 
            var playerPos = [];

            playerPos.push(new SFS2X.SFSUserVariable(NetData.NET_PLAYER_X, player.x));
            playerPos.push(new SFS2X.SFSUserVariable(NetData.NET_PLAYER_Y, player.y));
            
            sfs.send(new SFS2X.SetUserVariablesRequest(playerPos));
        }
        // For single player, update an AI player
        else {
            this.moveSinglePlayerOpponent();
        }
    
    },
    
    // Displays debug information
    render: function () {
        // game.debug.spriteInfo(player, 32, 32);
        // game.debug.body(player);
        healthBar.forEachAlive(this.renderGroup, this);
        // game.debug.body(gameFloor);
        this.game.debug.text('Time: ' + this.secTimer, ScreenData.viewportWidth/2, 60, 'yellow', 'Segoe UI');
        
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
    },
    
    checkAiHelp: function() {
        // var randomNumber = game.rnd.integerInRange(0, 50); //Generate a random number between 0 and 50.
        // console.log(randomNumber);
        /*
        Calculate the difference between player 1's health and player 2's health.
        
        Add this value to the random number.
        
        If the result is >= a set value then spawn the AI.
        */
        var playerHealthDifference;
        if (player2Health < player1Health) {
            playerHealthDifference = player1Health - player2Health;
        }
        else {
            playerHealthDifference = player2Health - player1Health;
        }
        if (playerHealthDifference >= 80) {
            console.log("Check for AI")
            this.getAiHelp()
        }
    },
    
    getAiHelp: function () {
        this.aiActivated = true;
        var randomNumber = game.rnd.integerInRange(0, 50);
        console.log("Random Number: " + randomNumber)
    },
    
    hit: function () {
        console.log("HIT");
        if (player2Health >= 0) {
            healthBar.getAt(1).body.setSize(player2Health,30,0,0);
            player2Health--;
            console.log("Player player2Health!")
        }
    },
    
    moveSinglePlayerOpponent: function() {
        var oponentHeading = "";
        
        if (player.x < PlayState.opponent.x) {
            if (this.delay) {
                console.log("DELAY")
                var storeTime = this.secTimer;
                console.log("STORE = " + storeTime)
                if (oponentHeading == "left") {
                    if ((this.secTimer-storeTime) > 2) {
                        console.log((this.secTimer-storeTime))
                        PlayState.opponent.x-= 4;
                    }
                } else if (oponentHeading == "right") {
                    if ((this.secTimer-storeTime) > 2) {
                        console.log((this.secTimer-storeTime))
                        PlayState.opponent.x+= 4;
                    }
                }
                this.delay = false;
            } else {
                oponentHeading = "left"
                PlayState.opponent.x-= 4;
                PlayState.opponent.animations.play('left');
            }
        }
        if (player.x > PlayState.opponent.x) {
            if (this.delay) {
                console.log("DELAY")
                var storeTime = this.secTimer;
                console.log("STORE = " + storeTime)
                if (oponentHeading == "left") {
                    if ((this.secTimer-storeTime) > 2) {
                        console.log((this.secTimer-storeTime))
                        PlayState.opponent.x-= 4;
                    }
                } else if (oponentHeading == "right") {
                    if ((this.secTimer-storeTime) > 2) {
                        console.log((this.secTimer-storeTime))
                        PlayState.opponent.x+= 4;
                    }
                }
                this.delay = false;
            } else {
                oponentHeading = "right"
                PlayState.opponent.x+= 4;
                PlayState.opponent.animations.play('right');
            }
        }
    },

    /**
    * Getting data from server for character select.
    * Update here.
    */
    updatePlayer: function(user, type) {

        if(!user.isItMe) {
            PlayState.p2Debug.setText(user.name + ": [x:" + user.getVariable(NetData.NET_PLAYER_X).value + ",y:" + user.getVariable(NetData.NET_PLAYER_Y).value + "]");

            console.log(PlayState.opponent);
            console.log(user.getVariable(NetData.NET_PLAYER_X).value);
            console.log(user.getVariable(NetData.NET_PLAYER_Y).value);

            PlayState.opponent.x = user.getVariable(NetData.NET_PLAYER_X).value;
            PlayState.opponent.y = user.getVariable(NetData.NET_PLAYER_Y).value;

            PlayState.otherDebugBox.x = user.getVariable(NetData.NET_PLAYER_X).value;
            PlayState.otherDebugBox.y = user.getVariable(NetData.NET_PLAYER_Y).value;
        }
        else {
            PlayState.p1Debug.setText(user.name + ": [x:" + user.getVariable(NetData.NET_PLAYER_X).value + ",y:" + user.getVariable(NetData.NET_PLAYER_Y).value + "]");
        }

    }
};