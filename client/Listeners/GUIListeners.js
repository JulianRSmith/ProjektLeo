/************************************************************

    This object should be used to handle general GUI listener
    events such as mouse hover and mouse leave. 

    There might be more general listeners we need so they 
    should be added here.

************************************************************/

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