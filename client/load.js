////////////////////////////////////////////////////////////////////////////////
//                               Load.js                                      //
////////////////////////////////////////////////////////////////////////////////

var loadState = {
    
    btnPath:  './assets/buttons/',
    plrPath: './assets/players/',
    audPath: './assets/sound/',
    backPath: './assets/backgrounds/',
    
    preload: function () {
        game.stage.backgroundColor = "#ffffff";
        var loadText = game.add.text(0, 0,'loading...',{font: "40px Calibri", fill: "#111111", boundsAlignH: "center", boundsAlignV: "middle"});
        loadText.setTextBounds(0, 100, screenWidth, 100);
        
        this.loadImages();
        this.loadSound();
    },
    
    create: function () {
        console.log("Loading - Loaded");    
        game.state.start('menu');
    },
    
    loadImages: function () {
        game.load.spritesheet('playButton', this.btnPath + 'playButton.png', 200, 100);
        game.load.spritesheet('selectButton', this.btnPath + 'selectButton.png', 200, 100);
        game.load.spritesheet('leoArt', this.btnPath + 'leoArt.png',140,180);
        game.load.spritesheet('playerKingL', this.plrPath + 'KingLeoneidus2.png', 256, 256);
        game.load.spritesheet('playerCleo', this.plrPath + 'Cleopatra.png', 32, 32);
        game.load.spritesheet('playerBoudica', this.plrPath + 'Boudica.png', 32, 32);
        game.load.image('charBg', this.backPath + 'charBg.png');
    },
    
    loadSound: function () {
        // https://www.freesound.org/people/braqoon/sounds/161098/
        game.load.audio('btnSound', [this.audPath + 'buttonSound.ogg' , this.audPath + 'buttonSound.mp3']);
    }
    
};
