
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
        console.log("ScreenData::init() : Running");

		this.viewportWidth = this.screenWidth;
		this.viewportHeight = 600;

		this.viewportCentreX = this.viewportWidth / 2;
		this.viewportCentreY = this.viewportHeight / 2;

		this.gameHeightBuffer = 50;
		this.gameHeight = this.viewportHeight - this.gameHeightBuffer;

	},

	debug: function() {

        // For debug
        console.log("ScreenData::debug() : Running");

		console.log("ScreenData::debug() : [screenWidth: " + this.screenWidth + "]");
		console.log("ScreenData::debug() : [screenHeight: " + this.screenHeight + "]");
		console.log("ScreenData::debug() : [viewportWidth: " + this.viewportWidth + "]");
		console.log("ScreenData::debug() : [viewportHeight: " + this.viewportHeight + "]");
		console.log("ScreenData::debug() : [viewportCentreX: " + this.viewportCentreX + "]");
		console.log("ScreenData::debug() : [viewportCentreY: " + this.viewportCentreY + "]");
		console.log("ScreenData::debug() : [gameHeightBuffer: " + this.gameHeightBuffer + "]");
		console.log("ScreenData::debug() : [gameHeight: " + this.gameHeight + "]");

	}
	
}