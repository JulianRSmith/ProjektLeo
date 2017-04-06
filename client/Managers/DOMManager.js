/************************************************************

    This object handles the menu within the DOM. 

************************************************************/

var DOMManager = {
    
    /**
     * Toggles a visibility of hidden menus in the DOM.
     */
    menuToggle: function(id) {
        
        AudioManager.gameButtonClick.play();
        
        if($('#' + id).css('display') == 'none') {
            $('#' + id).fadeIn();
        }
        else {
            $('#' + id).fadeOut();
        }
        
    }

}