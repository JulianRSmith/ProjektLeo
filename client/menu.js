var menuState = {
    
    create: function () {
        console.log("Game - Loaded");

        menuText = game.add.text(0, 0, 'ProjektLeo', { font: "40px Arial", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle" });
        menuText.setTextBounds(0, 100, screenWidth, 100);

        debugText = game.add.text(0, 0, 'Connecting to server...', { font: "24px Arial", fill: "#FF4C4C", boundsAlignH: "center", boundsAlignV: "middle" });
        debugText.setTextBounds(0, 192, screenWidth, 100);

		setTimeout(function() { connector.connect("127.0.0.1", "3010"); }, 2000);
    }
}