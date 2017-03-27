////////////////////////////////////////////////////////////////////////////////
//                               Load.js                                      //
////////////////////////////////////////////////////////////////////////////////

var STATE_LOAD = {
    
    // Declare asset paths
    buttonPath:  './assets/buttons/',
    buttonNewPath:  './assets/buttons/NewButtons/',
    playerPath: './assets/players/',
    audioPath: './assets/sound/',
    backgroundPath: './assets/backgrounds/',
    othersPath: './assets/other/',
    
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
        
        // Define all the music used, more for debugging
        var gameMainTheme = game.add.audio('musicMenu');
        var gameBattleTheme = game.add.audio('musicBattle');
        var gameButtonClick = game.add.audio('soundButtonClick');

        // Start the menu state
        game.state.start('STATE_MENU');

    },
    
    // Load Images Function
    loadImages: function () {
        game.load.image('gameLogo', './assets/logo/logo.png');
        
        game.load.spritesheet('leoArt', this.buttonPath + 'leoArt.png',140,180);
        game.load.spritesheet('cleoArt', this.buttonPath + 'cleoArt.png',140,180);
        game.load.spritesheet('boudArt', this.buttonPath + 'boudArt.png',140,180);
        
        game.load.spritesheet('playerLeo', this.playerPath + 'KingLeoneidus2.png', 256, 256);
        game.load.spritesheet('playerCleo', this.playerPath + 'Cleopatra2.png', 256, 256);
        game.load.spritesheet('playerBoud', this.playerPath + 'Boudica2.png', 256, 256);
        
        game.load.image('charSelectBackground', this.backgroundPath + 'charSelectBackground.png');
        game.load.image('battleBackground', this.backgroundPath + 'battleBackground.png');
        game.load.image('menuBackground', this.backgroundPath + 'menuBackground.png');
        game.load.image('woodBorder', this.othersPath + 'woodOutline.png');
        game.load.image('backgroundSmoke', this.othersPath + 'smoke.png');
        
        game.load.image('healthBarRed', this.othersPath + 'healthBar.png');
        game.load.image('healthBarBG', this.othersPath + 'healthBarBG.png');
        
        game.load.image('buttonGreenHover', this.buttonNewPath + "bGreenHover.png");
        game.load.image('buttonGreenNormal', this.buttonNewPath + "bGreenHover.png");
        game.load.image('buttonRedHover', this.buttonNewPath + "bRedHover.png");
        game.load.image('buttonRedNormal', this.buttonNewPath + "bRedNormal.png");
        game.load.image('buttonBlueBarNormal', this.buttonNewPath + "bBlueBarNormal.png");
        game.load.image('buttonGreenArrowNormal', this.buttonNewPath + "bGreenArrowNormal.png");
    },
    
    // Load Sound Function
    loadSounds: function () {
        // https://www.freesound.org/people/braqoon/sounds/161098/
        game.load.audio('soundButtonClick', [this.audioPath + 'buttonSound.ogg' , this.audioPath + 'buttonSound.mp3']);
        // https://www.freesound.org/people/Tristan_Lohengrin/sounds/319781/
        game.load.audio('musicMenu', this.audioPath + 'main_theme.mp3');
        // http://www.freesound.org/people/joshuaempyre/sounds/250856/
        game.load.audio('musicBattle', this.audioPath + 'battle_main.mp3');
    }
    
};
