/************************************************************

    This object is a way to store data related to the screen.
    We can keep track of:

	Screen Width and Height. (the total size of the inner window)
	Viewport Width and Height. (the total size of the game viewport)
	Viewport Centre X and Y. (the centre of the screen)

	// gameHeightBuffer could do with a rename to make sense
	There are some extra values here like gameHeightBuffer
	which I assume is the distance from bottom that makes 
	the gameworld floor.

	// gameHeight could do with a rename, too
	I also assume gameHeight is the distance from top of the
	screen to the bottom and represents the area which the 
	player can move through.

************************************************************/

var ScreenData = {

	screenWidth: window.innerWidth,
	screenHeight: window.innerHeight,

	viewportWidth: 0,
	viewportHeight: 0,

	viewportCentreX: 0,
	viewportCentreY: 0,

	gameHeightBuffer: 0,
	gameHeight: 0,
	gameWidth: 0,
	
	transitionTime: 1100,

	init: function() {

        // For debug
        ConsoleManager.log("ScreenData::init() : Running", false);

		this.viewportWidth = 958; //this.screenWidth;
		this.viewportHeight = 600;

		this.viewportCentreX = this.viewportWidth / 2;
		this.viewportCentreY = this.viewportHeight / 2;

		this.gameHeightBuffer = 50;
		this.gameHeight = this.viewportHeight - this.gameHeightBuffer;
		this.gameWidth = 1920;

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