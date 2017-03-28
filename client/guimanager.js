
var GUIManager = {

    /**
     * Creates a button element with text and a background.
     */
    createButton: function(buttonText, buttonX, buttonY, buttonColour, buttonSprite, mainCallback) {

        var lbBtnBg = game.add.sprite(buttonX, buttonY, buttonSprite, { boundsAlignH: "center", boundsAlignV: "middle" });
        var lbBtn = game.add.text(buttonX, buttonY, buttonText, { font: '18px Arial', fill: buttonColour, boundsAlignH: "center", boundsAlignV: "middle" });
        
        lbBtn.inputEnabled = true;
        lbBtn.events.onInputUp.add(mainCallback, this);
        lbBtn.events.onInputOver.add(this.buttonHoverState, this);
        lbBtn.events.onInputOut.add(this.buttonLeavestate, this);
        lbBtn.anchor.x = 0.5;
        lbBtn.anchor.y = 0.5;
        
        lbBtnBg.inputEnabled = true;
        lbBtnBg.events.onInputUp.add(mainCallback, this);
        lbBtnBg.events.onInputOver.add(this.buttonHoverState, this);
        lbBtnBg.events.onInputOut.add(this.buttonLeavestate, this);
        lbBtnBg.anchor.x = 0.5;
        lbBtnBg.anchor.y = 0.5;
    
        return [ lbBtn, lbBtnBg ];

    },

    /**
     * Button hover listener.
     */
    buttonHoverState: function() {

        game.canvas.style.cursor = "pointer";

    },

    /**
     * Button leave listener.
     */
    buttonLeavestate: function() {

        game.canvas.style.cursor = "default";

    },

    /**
     * Renders background smoke.
     */
    backgroundSmoke: function(image) {

        emitter = game.add.emitter(game.world.centerX, game.height, 50);
        emitter.width = viewportWidth;
        
        emitter.minParticleScale = 0.1;
        emitter.maxParticleScale = 0.9;
        emitter.minRotation = -5;
        emitter.maxRotation = 5;
        emitter.setYSpeed(-2, -5);
        emitter.setXSpeed(10, 20);
        emitter.gravity = -10;
        emitter.setAlpha(0, 0.2, 6000, Phaser.Easing.Quadratic.InOut, true);
        
        emitter.makeParticles(image);
        emitter.start(false, 6000, 100, 0);

    },

    /**
     * Renders game border
     */
    backgroundBorder: function(image) {

        var imageWidth = game.cache.getImage(image).width;

        for (i = 0; i<screenWidth;i += imageWidth) {
            var woodBorderTop = game.add.tileSprite(i, 0, imageWidth, imageWidth, image);
            var woodBorderBtm = game.add.tileSprite(i, viewportHeight-imageWidth, imageWidth, imageWidth, image);
        }

    },

    /**
     * Tiles the background image if it is smaller than the viewport.
     */
    backgroundTile: function(image) { 

        var imageWidth = game.cache.getImage(image).width;
        
        for (i = 0; i < screenWidth; i += imageWidth) {
            var background = game.add.tileSprite(i, 0, imageWidth, imageWidth, image);
        }

    }

}