var loadState = {
    
    preload: function () {
        var loadText = game.add.text(screenWidth/2,100,'loading...',{ font: "15px Arial", fill: "#ffffff" });
        game.stage.backgroundColor = "#660066";
        var menuText;
    },
    
    create: function () {
        console.log("Loading - Loaded");    
        game.state.start('menu');
    }
    
}