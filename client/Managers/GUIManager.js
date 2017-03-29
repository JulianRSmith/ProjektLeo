
var GUIManager = {

    /**
     * Creates a button element with text and a background.
     */
    createButton: function(buttonText, buttonX, buttonY, buttonColour, buttonSprite, mainCallback) {

        // For debug
        ConsoleManager.log("GUIManager::createButton() : Running", false);

        var lbBtnBg = game.add.sprite(buttonX, buttonY, buttonSprite, { boundsAlignH: "center", boundsAlignV: "middle" });
        var lbBtn = game.add.text(buttonX, buttonY, buttonText, { font: '18px Arial', fill: buttonColour, boundsAlignH: "center", boundsAlignV: "middle" });
        
        lbBtn.inputEnabled = true;
        lbBtn.events.onInputUp.add(mainCallback, this);
        lbBtn.events.onInputOver.add(GUIListeners.buttonHoverState, this);
        lbBtn.events.onInputOut.add(GUIListeners.buttonLeavestate, this);
        lbBtn.anchor.x = 0.5;
        lbBtn.anchor.y = 0.5;
        
        lbBtnBg.inputEnabled = true;
        lbBtnBg.events.onInputUp.add(mainCallback, this);
        lbBtnBg.events.onInputOver.add(GUIListeners.buttonHoverState, this);
        lbBtnBg.events.onInputOut.add(GUIListeners.buttonLeavestate, this);
        lbBtnBg.anchor.x = 0.5;
        lbBtnBg.anchor.y = 0.5;
    
        return [ lbBtn, lbBtnBg ];

    },

    /**
     * Creates a button element with text and a background.
     * Identical to createButton, but accepts lobbyId and lobbyName that can be passed into the mainCallback on the onInputUp event.
     */
    createLobbyButton: function(buttonText, buttonX, buttonY, lobbyId, lobbyName, buttonColour, buttonSprite, mainCallback) {

        // For debug
        ConsoleManager.log("GUIManager::createButton() : Running", false);

        var lbBtnBg = game.add.sprite(buttonX, buttonY, buttonSprite, { boundsAlignH: "center", boundsAlignV: "middle" });
        var lbBtn = game.add.text(buttonX, buttonY, buttonText, { font: '18px Arial', fill: buttonColour, boundsAlignH: "center", boundsAlignV: "middle" });
        
        lbBtn.inputEnabled = true;
        lbBtn.events.onInputUp.add(mainCallback, this, 0, {lobbyId, lobbyName});
        lbBtn.events.onInputOver.add(GUIListeners.buttonHoverState, this);
        lbBtn.events.onInputOut.add(GUIListeners.buttonLeavestate, this);
        lbBtn.anchor.x = 0.5;
        lbBtn.anchor.y = 0.5;
        
        lbBtnBg.inputEnabled = true;
        lbBtnBg.events.onInputUp.add(mainCallback, this, 0, {lobbyId, lobbyName});
        lbBtnBg.events.onInputOver.add(GUIListeners.buttonHoverState, this);
        lbBtnBg.events.onInputOut.add(GUIListeners.buttonLeavestate, this);
        lbBtnBg.anchor.x = 0.5;
        lbBtnBg.anchor.y = 0.5;
    
        return [ lbBtn, lbBtnBg ];

    },

    /**
     * Creates a button for the character panel
     */
    createCharacterPanel: function(characterName, imageName, imagePosition) {

        // For debug
        ConsoleManager.log("GUIManager::createCharacterPanel() : Running", false);

        var charButton = game.add.sprite(imagePosition, 270, imageName, 5);
        charButton.anchor.x = 0.5;
        charButton.anchor.y = 0.5;
        charButton.inputEnabled = true;
        charButton.animations.add('hover', [1, 2, 3], 5, true);
        charButton.frame = 1;
        
        charButton.events.onInputOver.add(function(){
            
            charButton.animations.play('hover');
            game.canvas.style.cursor = "pointer";

        }, this);
        
        charButton.events.onInputOut.add(function(){

            charButton.animations.stop('hover');
            game.canvas.style.cursor = "default";

        }, this);
        
        charButton.events.onInputDown.add(function(){
            
            charButton.animations.stop('hover');
            charButton.inputEnabled = false;
            charButton.frame = 0;

            PlayerData.setSelectedCharacter(characterName);

        }, this);
        
        return charButton;
    },

    /**
     * Renders background smoke.
     */
    backgroundSmoke: function(image) {

        // For debug
        ConsoleManager.log("GUIManager::backgroundSmoke() : Running", false);

        emitter = game.add.emitter(game.world.centerX, game.height, 50);
        emitter.width = ScreenData.viewportWidth;
        
        emitter.minParticleScale = 0.1;
        emitter.maxParticleScale = 0.9;
        emitter.minRotation = -5;
        emitter.maxRotation = 5;
        emitter.setYSpeed(-2, -5);
        emitter.setXSpeed(10, 20);
        emitter.gravity = -10;
        emitter.setAlpha(0, 0.2, 6000, Phaser.Easing.Quadratic.InOut, false);
        
        emitter.makeParticles(image);
        emitter.start(false, 6000, 100, 0);

    },

    /**
     * Renders game border
     */
    backgroundBorder: function(image) {

        // For debug
        ConsoleManager.log("GUIManager::backgroundBorder() : Running", false);

        var imageWidth = game.cache.getImage(image).width;

        for (i = 0; i < ScreenData.screenWidth; i += imageWidth) {
            var woodBorderTop = game.add.tileSprite(i, 0, imageWidth, imageWidth, image);
            var woodBorderBtm = game.add.tileSprite(i, ScreenData.viewportHeight - imageWidth, imageWidth, imageWidth, image);
        }

    },

    /**
     * Tiles the background image if it is smaller than the viewport.
     */
    backgroundTile: function(image) { 

        // For debug
        ConsoleManager.log("GUIManager::backgroundTile() : Running", false);

        var imageWidth = game.cache.getImage(image).width;
        
        for (i = 0; i < ScreenData.screenWidth; i += imageWidth) {
            var background = game.add.tileSprite(i, 0, imageWidth, imageWidth, image);
        }

    }

}