/************************************************************

    This object handles the creation of GUI elements used
    within the game such as buttons and special lobby
    buttons.

************************************************************/

var GUIManager = {

    /**
     * Creates a button element with text and a background.
     */
    createButton: function(buttonText, buttonX, buttonY, buttonColour, buttonSprite, mainCallback) {

        // For debug
        ConsoleManager.log("GUIManager::createButton() : Running", false);

        var lbBtnBg = game.add.sprite(buttonX, buttonY, buttonSprite, { boundsAlignH: "center", boundsAlignV: "middle" });
        var lbBtn = game.add.text(buttonX, buttonY, buttonText, { font: '30px Arial', fill: buttonColour, boundsAlignH: "center", boundsAlignV: "middle", stroke: "#8c6239", strokeThickness: 1 });
        
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
    createLobbyButton: function(buttonText, buttonX, buttonY, lobbyObj, buttonColour, buttonSprite, mainCallback) {

        // For debug
        ConsoleManager.log("GUIManager::createButton() : Running", false);

        var lbBtnBg = game.add.sprite(buttonX, buttonY, buttonSprite, { boundsAlignH: "center", boundsAlignV: "middle" });
        var lbBtn = game.add.text(buttonX, buttonY, buttonText, { font: '18px Arial', fill: buttonColour, boundsAlignH: "center", boundsAlignV: "middle" });
        
        lbBtn.inputEnabled = true;
        lbBtn.events.onInputUp.add(mainCallback, this, 0, lobbyObj);
        lbBtn.events.onInputOver.add(GUIListeners.buttonHoverState, this);
        lbBtn.events.onInputOut.add(GUIListeners.buttonLeavestate, this);
        lbBtn.anchor.x = 0.5;
        lbBtn.anchor.y = 0.5;
        
        lbBtnBg.inputEnabled = true;
        lbBtnBg.events.onInputUp.add(mainCallback, this, 0, lobbyObj);
        lbBtnBg.events.onInputOver.add(GUIListeners.buttonHoverState, this);
        lbBtnBg.events.onInputOut.add(GUIListeners.buttonLeavestate, this);
        lbBtnBg.anchor.x = 0.5;
        lbBtnBg.anchor.y = 0.5;
    
        return [ lbBtn, lbBtnBg ];

    },

    /**
     * Creates a button for the character panel
     */
    createCharacterPanel: function(characterName, imageName, imagePosition, mainCallback) {

        // For debug
        ConsoleManager.log("GUIManager::createCharacterPanel() : Running", false);

        var charButton = game.add.sprite(imagePosition, 240, imageName, 5);
        charButton.anchor.x = 0.5;
        charButton.anchor.y = 0.5;
        charButton.inputEnabled = true;
        charButton.animations.add('hover', [1, 2, 3], 5, true);
        charButton.frame = 1;
        charButton._btnData = {charName: characterName};
        
        charButton.events.onInputOver.add(function(){
            charButton.animations.play('hover');
            game.canvas.style.cursor = "pointer";
        }, this);
        
        charButton.events.onInputOut.add(function(){
            charButton.animations.stop('hover');
            game.canvas.style.cursor = "default";
        }, this);
        
        charButton.events.onInputDown.add(mainCallback, this);

        // Add placename bellow
        var nameBackground = game.add.sprite(imagePosition, 370, 'goldPlacename');
        nameBackground.anchor.x = 0.5;
        nameBackground.anchor.y = 0.5;

        // Add character names
        var placeholderText = game.add.text(0, 0, getCharName(characterName), {font: "22px Calibri", fill: "#341e09", boundsAlignH: "center", boundsAlignV: "middle", stroke: "#b8b15c", strokeThickness: 1});
        placeholderText.setTextBounds(imagePosition-55, 345, 110, 56);
        
        return charButton;
    },

    /**
     * Renders background smoke.
     */
    backgroundSmoke: function(image) {

        // For debug
        ConsoleManager.log("GUIManager::backgroundSmoke() : Running", false);
        // Set up the smoke emitter
        smoke = game.add.emitter(game.world.centerX, game.height, 50);
        smoke.width = ScreenData.viewportWidth;
        // Smoke emmiter preferences
        smoke.minParticleScale = 0.1;
        smoke.maxParticleScale = 0.9;
        smoke.minRotation = -5;
        smoke.maxRotation = 5;
        smoke.setYSpeed(-2, -5);
        smoke.setXSpeed(10, 20);
        smoke.gravity = -5;
        smoke.setAlpha(0, 0.2, 6000, Phaser.Easing.Quadratic.InOut, false);
        
        smoke.makeParticles(image);
        smoke.start(false, 6000, 100, 0);

    },

    /**
     * Renders game border
     */
    backgroundBorder: function(image) {

        // For debug
        ConsoleManager.log("GUIManager::backgroundBorder() : Running", false);

        var imageWidth = game.cache.getImage(image).width;

        for (i = 0; i < ScreenData.viewportWidth; i += imageWidth) {
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
        
        for (i = 0; i < ScreenData.viewportWidth; i += imageWidth) {
            var background = game.add.tileSprite(i, 0, imageWidth, imageWidth, image);
        }

    }

}