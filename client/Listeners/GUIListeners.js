
var GUIListeners = {

    /**
     * Button hover listener.
     */
    buttonHoverState: function() {

        // For debug
        console.log("GUIListeners::buttonHoverState() : Running");

        game.canvas.style.cursor = "pointer";

    },

    /**
     * Button leave listener.
     */
    buttonLeavestate: function() {

        // For debug
        console.log("GUIListeners::buttonLeavestate() : Running");

        game.canvas.style.cursor = "default";

    }
	
}