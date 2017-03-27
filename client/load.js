////////////////////////////////////////////////////////////////////////////////
//                               Load.js                                      //
////////////////////////////////////////////////////////////////////////////////

var loadState = {
    
    // Declare asset paths
    buttonPath:  './assets/buttons/',
    buttonNewPath:  './assets/buttons/NewButtons/',
    playerPath: './assets/players/',
    audioPath: './assets/sound/',
    backgroundPath: './assets/backgrounds/',
    
    preload: function () {
        
        // Set load background colour
        game.stage.backgroundColor = "#FFFFFF";
        
        // Display loading text
        var loadText = game.add.text(0, 0, 'Loading...', {font: "40px Calibri", fill: "#111111", boundsAlignH: "center", boundsAlignV: "middle"});
        loadText.setTextBounds(0, 100, screenWidth, 100);
        
        // Call asset loading functions
        this.loadImages();
        this.loadSounds();
    },
    
    create: function () {
        
        var gameMainTheme = game.add.audio('mainSound');
        
        console.log("Loading - Loaded");    
        game.state.start('menu');
    },
    
    // Load Images Function
    loadImages: function () {
        game.load.spritesheet('leoArt', this.buttonPath + 'leoArt.png',140,180);
        game.load.spritesheet('cleoArt', this.buttonPath + 'cleoArt.png',140,180);
        game.load.spritesheet('boudArt', this.buttonPath + 'boudArt.png',140,180);
        
        game.load.spritesheet('playerKingL', this.playerPath + 'KingLeoneidus2.png', 256, 256);
        game.load.spritesheet('playerCleo', this.playerPath + 'Cleopatra2.png', 256, 256);
        game.load.spritesheet('playerBoud', this.playerPath + 'Boudica2.png', 256, 256);
        
        game.load.image('charBg', this.backgroundPath + 'charBg.png');
        game.load.image('battleBG', this.backgroundPath + 'battleBG.png');
        
        game.load.image('logoMain', './assets/logo/logo.png');
        
        game.load.image('hBarRed', './assets/other/healthBar.png');
        game.load.image('hBarBG', './assets/other/healthBarBG.png');
        
        game.load.image('woodOutline', './assets/other/woodOutline.png');
        
        game.load.image('smoke', './assets/other/smoke.png');
        
        game.load.image('bGreenHover', this.buttonNewPath + "bGreenHover.png");
        game.load.image('bGreenNormal', this.buttonNewPath + "bGreenHover.png");
        game.load.image('bRedHover', this.buttonNewPath + "bRedHover.png");
        game.load.image('bRedNormal', this.buttonNewPath + "bRedNormal.png");
        game.load.image('bBlueBarNormal', this.buttonNewPath + "bBlueBarNormal.png");
        game.load.image('bGreenArrowNormal', this.buttonNewPath + "bGreenArrowNormal.png");
    },
    
    // Load Sound Function
    loadSounds: function () {
        // https://www.freesound.org/people/braqoon/sounds/161098/
        game.load.audio('btnSound', [this.audioPath + 'buttonSound.ogg' , this.audioPath + 'buttonSound.mp3']);
        // https://www.freesound.org/people/Tristan_Lohengrin/sounds/319781/
        game.load.audio('mainSound', this.audioPath + 'main_theme.mp3');
        // http://www.freesound.org/people/joshuaempyre/sounds/250856/
        game.load.audio('mainBattle', this.audioPath + 'battle_main.mp3');
    }
    
};
