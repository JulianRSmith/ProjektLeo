////////////////////////////////////////////////////////////////////////////////
//                                   Char.js                                  //
////////////////////////////////////////////////////////////////////////////////
//            This file handles the character selection screen                //
////////////////////////////////////////////////////////////////////////////////

var CharState = {
    
    leoCharacterPanel: 0,
    boudCharacterPanel: 0,
    cleoCharaterPanel: 0,
    panelImageWidth: 0,

    characterSelected: 0,

    charText: 0,

    buttonPlay: 0,
    buttonMenu: 0,
    
    create: function () {

        // Set game world size
        game.world.setBounds(0, 0, ScreenData.viewportWidth, ScreenData.viewportHeight);

        // Background objects
        GUIManager.backgroundTile('menuBackground');
        GUIManager.backgroundSmoke('backgroundSmoke');
        GUIManager.backgroundBorder('woodBorder');

        // Title Text
        this.charText = game.add.text(0, 0, 'Select a Character', {font: "40px Calibri", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
        this.charText.setTextBounds(0, 30, ScreenData.screenWidth, 50);
        
        // Character Buttons
        this.panelImageWidth = ((game.cache.getImage('leoArt').width/4)+32);
        this.leoCharacterPanel = GUIManager.createCharacterPanel('playerLeo', 'leoArt', ScreenData.viewportCentreX - this.panelImageWidth);
        this.boudCharacterPanel = GUIManager.createCharacterPanel('playerBoud', 'boudArt', ScreenData.viewportCentreX);
        this.cleoCharacterPanel = GUIManager.createCharacterPanel('playerCleo', 'cleoArt', ScreenData.viewportCentreX + this.panelImageWidth);
        
        // Add buttons
        this.buttonPlay = GUIManager.createButton('Select', ScreenData.screenWidth / 2 + 110, ScreenData.viewportHeight - 70, '#FFFFFF', "buttonGreenNormal", this.selectOnClick);
        this.buttonMenu = GUIManager.createButton('Menu', ScreenData.screenWidth / 2 - 110, ScreenData.viewportHeight - 70, '#FFFFFF', "buttonGreenNormal", this.menuOnClick);
        
    },
    
    /**
     * Starts the play state on click.
     */
    selectOnClick: function() {

        AudioManager.gameButtonClick.play();
        AudioManager.gameMainTheme.stop();

        game.state.start('PlayState');
    
    },
     
    /**
     * Sets the currently selected character.
     */
    charOnClick: function(characterName) {

        AudioManager.gameButtonClick.play();

        PlayerData.setSelectedCharacter(characterName)

    },
    
    /**
     * Return to menu on click.
     */
    menuOnClick: function() {

        AudioManager.gameButtonClick.play();
        
        game.state.start("MenuState");
    
    }
}