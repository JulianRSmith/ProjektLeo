////////////////////////////////////////////////////////////////////////////////
//                               Load.js                                      //
////////////////////////////////////////////////////////////////////////////////

var loadState = {
    
    preload: function () {
        var loadText = game.add.text(screenWidth/2,100,'loading...',{ font: "15px Arial", fill: "#ffffff" });
        ////////////////////////////////////////////////////////////////////////
        // IMAGES
        game.load.spritesheet('playButton', './assets/buttons/playButton.png', 200, 100);
        //////////////////////////////////////////////////////////////////////// 
    },
    
    create: function () {
        console.log("Loading - Loaded");    
        game.state.start('menu');
    }
    
}