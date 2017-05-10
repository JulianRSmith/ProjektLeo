/************************************************************

    this.js

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

    _attackIsPressed: 0,

    _playerAttack: 0,
    _playerPos: 0,
    _playerHealth: 0,

    _oPX: 0,

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
        
        // Randomly select enemy player if in single player game
        if (!NetworkManager.connected() && LobbyData.lobby == 0){
            this.singlePlayer = true;
            this.otherPlayerChar = PlayerData.generateEnemyPlayer(this.userChar)
            //ConsoleManager.log("Single Player Game = " + this.singlePlayer + " Enemy = " + this.otherPlayerChar, false)
        } else {
            this.otherPlayerChar = NetPlayer.playerChar;
            //ConsoleManager.log("Multiplayer Game Started = " + this.otherPlayerChar, false)
        }
        
        // Create the health bar on screen
        healthBar = createHealthBar(this.userChar);
        
        // Add characters name
        addCharNames(this.userChar, this.otherPlayerChar);
        
        // Enabled Keyboard
        this.keyboard = game.input.keyboard;
        // Call function that enables the keyboard
        this.enableKeyboard();
        
        // Apply global physics
        game.physics.arcade.gravity.y = 700;
        
        // Create other opponent
        this.opponent = createPlayer(ScreenData.gameWidth-32, this.otherPlayerChar);
        // Create Player Sprite
        player = createPlayer (32, this.userChar);
        player.frame = 1;
        
        // Make the camera follow the player
        game.camera.follow(player);
        
        if (!this.singlePlayer) {
            this._playerPos = [];
            this._playerPos.push(new SFS2X.SFSUserVariable(NetData.NET_PLAYER_X, player.x));
            this._playerPos.push(new SFS2X.SFSUserVariable(NetData.NET_PLAYER_Y, player.y));
            sfs.send(new SFS2X.SetUserVariablesRequest(this._playerPos));
        }
        // this.buttonMenu = GUIManager.createButton('Menu', ScreenData.screenWidth, ScreenData.viewportHeight - 70, '#FFFFFF', "buttonGreenNormal", this.menuOnClick);
        
        woodTransitionIn();
    },
    
    update: function () {

        if(!PlayerData.hasDied && !NetPlayer.hasDied) {
            var _pPX = player.x;
            var _pPY = player.y;

            // Game time
            this.secTimer = this.game.time.totalElapsedSeconds().toFixed(2);


            if (!this.aiActivated) {
                this.checkAiHelp();
            }
            if (!this.singlePlayer) {
                this.checkHealthUpdated();
            }

            // Don't allow the gmae floor and the player to overlap each other
            game.physics.arcade.collide(player, gameFloor);
            // Don't allow the gmae floor and the player to overlap each other
            game.physics.arcade.collide(this.opponent, gameFloor);
            
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
            else {
                player.animations.stop();
            }
            
            if(this.key_A.isDown) {
                player.animations.play('attack');
                
                if(this.singlePlayer) {
                    this.game.physics.arcade.overlap(player, this.opponent, this.hit, null, this);
                }
                else {
                    this._playerAttack = [];
                    this._playerAttack.push(new SFS2X.SFSUserVariable(NetData.NET_PLAYER_ATTACK, true));
                    
                    sfs.send(new SFS2X.SetUserVariablesRequest(this._playerAttack));

                    this._attackIsPressed = true;
                }
                
            }
            else if(this.key_A.isUp) {
                if(!this.singlePlayer && this._attackIsPressed) {

                    this._attackIsPressed = false;

                    this._playerAttack = [];
                    this._playerAttack.push(new SFS2X.SFSUserVariable(NetData.NET_PLAYER_ATTACK, false));
                    
                    sfs.send(new SFS2X.SetUserVariablesRequest(this._playerAttack));

                    //console.log("sending not attack");

                    player.animations.stop();
                }
                // player.animations.stop();
            }
            
            // Make the player jump only if they're touching the ground
            if (this.key_Up.isDown && player.body.touching.down) {
                player.body.velocity.y = -600;
                //ConsoleManager.log("Player Jump")
            }
            
            if(this.singlePlayer) { 
                this.moveSinglePlayerOpponent();
            }
            else {
                this.updateOtherPlayerAnims();
            }

            if(player.y < 422) {
                this._playerPos = [];
                this._playerPos.push(new SFS2X.SFSUserVariable(NetData.NET_PLAYER_Y, player.y));
                sfs.send(new SFS2X.SetUserVariablesRequest(this._playerPos));
            }
            if(_pPX != player.x) {
                this._playerPos = [];
                this._playerPos.push(new SFS2X.SFSUserVariable(NetData.NET_PLAYER_X, player.x));
                sfs.send(new SFS2X.SetUserVariablesRequest(this._playerPos));
                //console.log("player pos changed.");
            }

            if(player1Health < 1) {
                this._hasDied = [];
                this._hasDied.push(new SFS2X.SFSUserVariable(NetData.NET_PLAYER_DIED, true));
                sfs.send(new SFS2X.SetUserVariablesRequest(this._hasDied));
            }
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
        // //ConsoleManager.log(randomNumber);
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
            //ConsoleManager.log("Check for AI", false)
            this.getAiHelp()
        }
    },
    
    getAiHelp: function () {
        this.aiActivated = true;
        var randomNumber = game.rnd.integerInRange(0, 50);
        //ConsoleManager.log("Random Number: " + randomNumber)
    },
    
    hit: function () {
        //ConsoleManager.log("HIT", false);
        // If a multiplayer game
        if (!this.singlePlayer) {
            
            if (player1Health >= 0) {
                player1Health--;
                
                this._playerHealth = []
                this._playerHealth.push(new SFS2X.SFSUserVariable(NetData.NET_PLAYER_HEALTH, player1Health));
                sfs.send(new SFS2X.SetUserVariablesRequest(this._playerHealth));
            }
        }
        // If a single player game
        else {
            if (player2Health >= 0) {
                player2Health--;
                //ConsoleManager.log("Player player2Health!", false)
            }
        }
        
        this.checkHealthUpdated();
    },
    
    moveSinglePlayerOpponent: function() {
        var oponentHeading = "";
        
        if (player.x < this.opponent.x) {
            if (this.delay) {
                //ConsoleManager.log("DELAY", false)
                var storeTime = this.secTimer;
                //ConsoleManager.log("STORE = " + storeTime, false)
                if (oponentHeading == "left") {
                    if ((this.secTimer-storeTime) > 2) {
                        //ConsoleManager.log((this.secTimer-storeTime), false)
                        this.opponent.x-= 4;
                    }
                } else if (oponentHeading == "right") {
                    if ((this.secTimer-storeTime) > 2) {
                        //ConsoleManager.log((this.secTimer-storeTime), false)
                        this.opponent.x+= 4;
                    }
                }
                this.delay = false;
            } else {
                oponentHeading = "left"
                this.opponent.x-= 4;
                this.opponent.animations.play('left');
            }
        }
        if (player.x > this.opponent.x) {
            if (this.delay) {
                //ConsoleManager.log("DELAY", false);
                var storeTime = this.secTimer;
                //ConsoleManager.log("STORE = " + storeTime, false)
                if (oponentHeading == "left") {
                    if ((this.secTimer-storeTime) > 2) {
                        //ConsoleManager.log((this.secTimer-storeTime), false)
                        this.opponent.x-= 4;
                    }
                } else if (oponentHeading == "right") {
                    if ((this.secTimer-storeTime) > 2) {
                        //ConsoleManager.log((this.secTimer-storeTime), false)
                        this.opponent.x+= 4;
                    }
                }
                this.delay = false;
            } else {
                oponentHeading = "right"
                this.opponent.x+= 4;
                this.opponent.animations.play('right');
            }
        }
    },

    updateOtherPlayerAnims: function() {

        if(this._oPX > this.opponent.x) {
            this.opponent.animations.play('left');
        }
        else if(this._oPX < this.opponent.x) {
            this.opponent.animations.play('right');
        }
        else {
            this.opponent.animations.stop();
        }

    },

    /**
    * Getting data from server for character select.
    * Update here.
    */
    updatePlayer: function(user, type) {

        if (type == "play_state") {
            if(!user.isItMe) {
                //this.p2Debug.setText(user.name + ": [x:" + user.getVariable(NetData.NET_PLAYER_X).value + ",y:" + user.getVariable(NetData.NET_PLAYER_Y).value + "]");
        
                ////ConsoleManager.log(this.opponent, false);
                ////ConsoleManager.log(user.getVariable(NetData.NET_PLAYER_X).value, false);
                ////ConsoleManager.log(user.getVariable(NetData.NET_PLAYER_Y).value, false);

                this._oPX = this.opponent.x;

                this.opponent.x = user.getVariable(NetData.NET_PLAYER_X).value;
                this.opponent.y = user.getVariable(NetData.NET_PLAYER_Y).value;
            }
            else {
                //this.p1Debug.setText(user.name + ": [x:" + user.getVariable(NetData.NET_PLAYER_X).value + ",y:" + user.getVariable(NetData.NET_PLAYER_Y).value + "]");
            }
        }
        
        if (type == "player_health") {
            
            if(!user.isItMe) {
                var _testHealth = user.getVariable(NetData.NET_PLAYER_HEALTH).value;
                player2Health = _testHealth;
                //console.log("OPPONENT HEALTH IS = " + _testHealth);
            }
            else {
                //console.log("MY HEALTH IS (from net) = " + user.getVariable(NetData.NET_PLAYER_HEALTH).value);
            }
            
        }
        
        if (type == "player_attack") {
            if(!user.isItMe) {
                // If the user isn't the current user
                if(user.getVariable(NetData.NET_PLAYER_ATTACK).value) {
                    // Is attacking
                    //console.log("ENEMY IS ATTACKING");

                    this.opponent.animations.play('attack');
                    this.game.physics.arcade.overlap(player, this.opponent, this.hit, null, this);
                    
                } else {
                    // Not attacking
                }
            } else {
                // If the user is me
            }
        }

    },
    
    checkHealthUpdated: function() {
        healthBar.getAt(0).body.setSize(player1Health,30,0,0);
        healthBar.getAt(1).body.setSize(player2Health,30,0,0);
    }
};