/************************************************************

    CharState.js

    The state for the character selection screen.

    // TODO:
        This needs changing to work with the new lobby
        system which allows multiple players to connect to
        a lobby.

        We also need to ensure this state works in single
        player and loads an AI player if that is the case.

        The easy way to check for this is to look into:
        NetworkManager.connect(); // to check if connected
        PlayerData.lobbyData; // to get data related to a lobby

        PlayerData.lobbyData MUST be 0 if the player is not
        in a lobby and can be used to check if we're playing
        a multiplayer or single player game.

************************************************************/

var CharState = {
    
    leoCharacterPanel: 0,
    boudCharacterPanel: 0,
    cleoCharaterPanel: 0,

    panelImageWidth: 0,

    charText: 0,

    buttonPlay: 0,
    buttonMenu: 0,
    
    create: function () {
        
        PlayerData.currentState = "CharState";

        // For debug
        console.log("CharState::create() : Running");

        // Set game world size
        game.world.setBounds(0, 0, ScreenData.viewportWidth, ScreenData.viewportHeight);

        // Background objects
        GUIManager.backgroundTile('menuBackground');
        GUIManager.backgroundSmoke('backgroundSmoke');
        GUIManager.backgroundBorder('woodBorder');

        // Title Text
        this.charText = game.add.text(0, 0, 'Select a Character', {font: "40px Calibri", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
        this.charText.setTextBounds(0, 80, ScreenData.screenWidth, 50);
        
        // Character Buttons
        this.panelImageWidth = ((game.cache.getImage('leoArt').width / 4) + 32);
        this.leoCharacterPanel = GUIManager.createCharacterPanel('playerLeo', 'leoArt', ScreenData.viewportCentreX - this.panelImageWidth);
        this.boudCharacterPanel = GUIManager.createCharacterPanel('playerBoud', 'boudArt', ScreenData.viewportCentreX);
        this.cleoCharacterPanel = GUIManager.createCharacterPanel('playerCleo', 'cleoArt', ScreenData.viewportCentreX + this.panelImageWidth);
        
        // Add buttons
        this.buttonPlay = GUIManager.createButton('Select', ScreenData.screenWidth / 2 - 110, ScreenData.viewportHeight - 110, '#341e09', "buttonGreenNormal", this.selectOnClick);
        this.buttonMenu = GUIManager.createButton('Menu', ScreenData.screenWidth / 2 + 110, ScreenData.viewportHeight - 110, '#341e09', "buttonGreenNormal", this.menuOnClick);
        
        if (LobbyData.lobby != 0){
            console.log("NETWORK CONNECT")
        } else {
            console.log("NETWORK NOT CONNECTED")
        }
        
    },
    
    /**
     * Starts the play state on click.
     */
    selectOnClick: function() {
        
        // For debug
        console.log("CharState::selectOnClick() : Running");

        AudioManager.gameButtonClick.play();
        AudioManager.gameMainTheme.stop();

        game.state.start('PlayState');
    
    },
     
    /**
     * Sets the currently selected character.
     */
    charOnClick: function(characterName) {
        
        // For debug
        console.log("CharState::charOnClick() : Running");

        AudioManager.gameButtonClick.play();

        PlayerData.setSelectedCharacter(characterName)

    },
    
    /**
     * Return to menu on click.
     */
    menuOnClick: function() {
        
        // For debug
        console.log("CharState::menuOnClick() : Running");

        AudioManager.gameButtonClick.play();
        
        game.state.start("MenuState");
    
    }
}