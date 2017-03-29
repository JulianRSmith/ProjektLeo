
var GUIListeners = {

    /**
     * Button hover listener.
     */
    buttonHoverState: function() {

        // For debug
        ConsoleManager.log("GUIListeners::buttonHoverState() : Running", false);

        game.canvas.style.cursor = "pointer";

    },

    /**
     * Button leave listener.
     */
    buttonLeavestate: function() {

        // For debug
        ConsoleManager.log("GUIListeners::buttonLeavestate() : Running", false);

        game.canvas.style.cursor = "default";

    }
	
}