////////////////////////////////////////////////////////////////////////////////
//                               Load.js                                      //
////////////////////////////////////////////////////////////////////////////////

var loadState = {
    
    preload: function () {
        var loadText = game.add.text(screenWidth/2,100,'loading...',{ font: "15px Arial", fill: "#ffffff" });
        ////////////////////////////////////////////////////////////////////////
        // ASSETS - PATHS                                                     //
        ////////////////////////////////////////////////////////////////////////
        var btnPath = './assets/buttons/';
        var plrPath = './assets/players/';
        var audPath = './assets/sound/';
        ////////////////////////////////////////////////////////////////////////
        // ASSETS - IMAGE                                                     //
        ////////////////////////////////////////////////////////////////////////
        game.load.spritesheet('playButton', btnPath + 'playButton.png', 200, 100);
        game.load.spritesheet('playerKingL', plrPath + 'KingLeoneidus2.png', 256, 256);
        game.load.spritesheet('playerCleo', plrPath + 'Cleopatra.png', 32, 32);
        game.load.spritesheet('playerBoudica', plrPath + 'Boudica.png', 32, 32);
        //////////////////////////////////////////////////////////////////////// 
        // https://www.freesound.org/people/braqoon/sounds/161098/
        game.load.audio('btnSound', [audPath + 'buttonSound.ogg' , audPath + 'buttonSound.mp3']);
    },
    
    create: function () {
        console.log("Loading - Loaded");    
        game.state.start('menu');
    }
    
}