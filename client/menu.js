var menuState = {
    
    create: function () {
        console.log("Game - Loaded");
        menuText = game.add.text(0,0,'Welcome',{ font: "40px Arial", fill: "#ffffff",boundsAlignH: "center", boundsAlignV: "middle" });
        menuText.setTextBounds(0, 100, screenWidth, 100);
    }
    
}