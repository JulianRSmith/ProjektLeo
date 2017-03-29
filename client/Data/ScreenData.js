
var ScreenData = {

	screenWidth: window.innerWidth,
	screenHeight: window.innerHeight,

	viewportWidth: 0,
	viewportHeight: 0,

	viewportCentreX: 0,
	viewportCentreY: 0,

	gameHeightBuffer: 0,
	gameHeight: 0,

	init: function() {

        // For debug
        ConsoleManager.log("ScreenData::init() : Running", false);

		this.viewportWidth = this.screenWidth;
		this.viewportHeight = 600;

		this.viewportCentreX = this.viewportWidth / 2;
		this.viewportCentreY = this.viewportHeight / 2;

		this.gameHeightBuffer = 50;
		this.gameHeight = this.viewportHeight - this.gameHeightBuffer;

	},

	debug: function() {

        // For debug
        ConsoleManager.log("ScreenData::debug() : Running", false);

		ConsoleManager.log("ScreenData::debug() : [screenWidth: " + this.screenWidth + "]", false);
		ConsoleManager.log("ScreenData::debug() : [screenHeight: " + this.screenHeight + "]", false);
		ConsoleManager.log("ScreenData::debug() : [viewportWidth: " + this.viewportWidth + "]", false);
		ConsoleManager.log("ScreenData::debug() : [viewportHeight: " + this.viewportHeight + "]", false);
		ConsoleManager.log("ScreenData::debug() : [viewportCentreX: " + this.viewportCentreX + "]", false);
		ConsoleManager.log("ScreenData::debug() : [viewportCentreY: " + this.viewportCentreY + "]", false);
		ConsoleManager.log("ScreenData::debug() : [gameHeightBuffer: " + this.gameHeightBuffer + "]", false);
		ConsoleManager.log("ScreenData::debug() : [gameHeight: " + this.gameHeight + "]", false);

	}
	
}