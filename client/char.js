////////////////////////////////////////////////////////////////////////////////
//                                   Char.js                                  //
////////////////////////////////////////////////////////////////////////////////
//            This file handles the character selection screen                //
////////////////////////////////////////////////////////////////////////////////

var charState = {
    
    leoArt: '',
    cleoArt: '',
    Art: '',
    imgPos1: 0,
    imgPos2: 0,
    imgWidth:0,
    imgWidthHalf:0,
    chosen: false,
    
    create: function () {
        
        // Add tiled background
        tiledBackgroundX('charBg');
        
        // Title Text
        var charText = game.add.text(0, 0, 'Select a Character',{font: "40px Calibri", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
        charText.setTextBounds(0, 50, screenWidth, 50);
        
        // Character Buttons
        var gameXcenter = game.world.centerX;
        this.imgWidth    = game.cache.getImage('leoArt').width;
        this.imgWidthHalf = this.imgWidth/8;
        this.imgPos1      = gameXcenter - (this.imgWidth/5);
        this.leoArt  = createCharArt(this.imgPos1,'leoArt');
        this.boudArt  = createCharArt(gameXcenter,'boudArt');
        this.imgPos2      = gameXcenter + (this.imgWidth/5);
        this.cleoArt = createCharArt(this.imgPos2,'cleoArt');
        
        btnSound = game.add.audio('btnSound');
        btnSound.allowMultiple = true;
        
        var buttonPlay = createLabelButton('Select', screenWidth / 2, viewportHeight - 70, '#FFFFFF', "bGreenNormal", this.actionOnClickChar, labelHover, labelOut);
        var buttonMenu = createLabelButton('Menu', 138, viewportHeight - 70, '#FFFFFF', "bGreenNormal", returnMenuOnClick, labelHover, labelOut);
        
    },
    
    update: function () {
        if (!this.chosen) {
            
            this.leoArt.events.onInputDown.add(function(){
                userChar = 'playerKingL';
                this.leoArt.frame = 0;
                this.chosen == true;
            }, this);
            this.leoArt.events.onInputOver.add(function(){
                this.leoArt.animations.play('hover');
                this.game.canvas.style.cursor = "pointer";
            }, this);
            this.leoArt.events.onInputOut.add(function(){
                this.leoArt.animations.stop('hover');
                this.game.canvas.style.cursor = "default";
            }, this);
            
            this.cleoArt.events.onInputDown.add(function(){
                userChar = 'playerCleoL';
                this.cleoArt.frame = 0;
                this.chosen == true;
            }, this);
            this.cleoArt.events.onInputOver.add(function(){
                this.cleoArt.animations.play('hover');
                this.game.canvas.style.cursor = "pointer";
            }, this);
            this.cleoArt.events.onInputOut.add(function(){
                this.cleoArt.animations.stop('hover');
                this.game.canvas.style.cursor = "default";
            }, this);
            
        }
    },
    
    // Function which calls when the player clicks the button
    actionOnClickChar: function () {
        console.log("CLICK");
        // Add button sound
        mainSound.stop();
        this.btnSound.play();
        game.state.start('play');
    
    },
     
    actionOnClickArt: function (playerChosen) {
        userChar = playerChosen;
        // console.log(userChar)
    },
    
    actionOnOverArt: function () {
        // userChar = chosenChar;
        // console.log(imgPos);
    },
    
    returnMenuOnClick: function() {
        game.state.start("menu");
    }
    
}