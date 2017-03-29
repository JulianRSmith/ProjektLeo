
var LobbyState = {

    serverText: 0,
    lobbyText: 0,
    lobbyPage: 0,

    lobbyList: [],
    lobbyCache: [],

    buttonMenu: 0,
    buttonRefreshLobby: 0,
    buttonCreateLobby: 0,
    buttonServerDisconnect: 0,

    nextState: 0,
    prevState: 0,

    create: function () {

        // For debug
        ConsoleManager.log("LobbyState::create() : Running", false);

        // Set game world size
        game.world.setBounds(0, 0, ScreenData.viewportWidth, ScreenData.viewportHeight);

        // Background objects
        GUIManager.backgroundTile('menuBackground');
        GUIManager.backgroundSmoke('backgroundSmoke');
        GUIManager.backgroundBorder('woodBorder');

        // Text objects
        this.serverText = game.add.text(10, 40, '', {font: "14px Calibri", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
        this.lobbyText = game.add.text(0, 0, 'Select a Lobby', {font: "40px Calibri", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
        this.lobbyText.setTextBounds(0, 30, ScreenData.screenWidth, 50);
        
        // Menu buttons 
        this.buttonCreateLobby = GUIManager.createButton('Create Lobby', ScreenData.viewportWidth / 2 - (110*3), ScreenData.viewportHeight - 70, '#FFFFFF', "buttonGreenNormal", function(){ DOMManager.menuToggle("lobby-create"); });
        this.buttonRefreshLobby = GUIManager.createButton('Refresh List', ScreenData.viewportWidth / 2 - (110*1), ScreenData.viewportHeight - 70, '#FFFFFF', "buttonGreenNormal", this.refreshOnClick);
        this.buttonMenu = GUIManager.createButton('Menu', ScreenData.viewportWidth / 2 + (110*1), ScreenData.viewportHeight - 70, '#FFFFFF', "buttonGreenNormal", this.menuOnClick);
        this.buttonServerDisconnect = GUIManager.createButton('Disconnect', ScreenData.viewportWidth / 2 + (110*3), ScreenData.viewportHeight - 70, '#FFFFFF', "buttonRedNormal", this.disconnectOnClick);

        // Lobby buttons
        this.buttonNextPage = GUIManager.createButton('>', ScreenData.viewportWidth / 2 + 460, ScreenData.viewportHeight / 2, '#FFFFFF', "buttonGreenArrowNormal", this.nextPageOnClick);
        this.buttonPrevPage = GUIManager.createButton('<', ScreenData.viewportWidth / 2 - 460, ScreenData.viewportHeight / 2, '#FFFFFF', "buttonGreenArrowNormal", this.prevPageOnClick);
        this.buttonPrevPage[1].angle = 180;

        this.refreshOnCreate();
        
    },

    render: function() {

        this.serverText.setText("Server: " + SettingsManager.serverIP + ":" + SettingsManager.serverPort + " | " + (NetworkManager.connected() ? "" : "Not ") + "Connected" + " | Page: " + (LobbyState.lobbyPage + 1));
        
    },
    
    refreshOnCreate: function() {

        // For debug
        ConsoleManager.log("LobbyState::refreshOnCreate() : Running", false);

        if(NetworkManager.connected()) {
            NetworkManager.request("connector.entryHandler.onGetLobbies", "", ProtocolManager.onGetLobbies);
        }
        
    },
    
    refreshOnClick: function() {

        // For debug
        ConsoleManager.log("LobbyState::refreshOnClick() : Running", false);

        AudioManager.gameButtonClick.play();
    
        if(NetworkManager.connected()) {
            NetworkManager.request("connector.entryHandler.onGetLobbies", "", ProtocolManager.onGetLobbies);
        }
        
    },

    createOnClick: function() {
        // For debug
        ConsoleManager.log("LobbyState::createOnClick() : Running", false);

        AudioManager.gameButtonClick.play();

        if($('#lobby-name').val().length > 20) { 
            ConsoleManager.warning("Lobby name must be less than 21 characters.", true);
        }
        else if($('#lobby-host').val().length > 15) {
            ConsoleManager.warning("Host name must be less than 15 characters.", true);
        }
        else if($('#lobby-name').val().length < 1) { 
            ConsoleManager.warning("Lobby name must be more than 0 characters.", true);
            
        }
        else if($('#lobby-host').val().length < 1) { 
            ConsoleManager.warning("Host name must be more than 0 characters.", true);
            
        }
        else {
            DOMManager.menuToggle('lobby-create');

            if(NetworkManager.connected()){
                NetworkManager.request("connector.entryHandler.onCreateLobby", {lobbyName: $('#lobby-name').val(), lobbyHost: $('#lobby-host').val()}, ProtocolManager.onCreateLobby);
            }
        }
        
    },
    
    nextPageOnClick: function() {

        // For debug
        ConsoleManager.log("LobbyState::nextPageOnClick() : Running", false);

        AudioManager.gameButtonClick.play();

        LobbyState.lobbyPage++;
        LobbyState.updateLobbyList();

    },
    
    prevPageOnClick: function() {

        // For debug
        ConsoleManager.log("LobbyState::prevPageOnClick() : Running", false);

        AudioManager.gameButtonClick.play();

        LobbyState.lobbyPage--;
        LobbyState.updateLobbyList();

    },
    
    menuOnClick: function() {

        // For debug
        ConsoleManager.log("LobbyState::menuOnClick() : Running", false);

        AudioManager.gameButtonClick.play();
        
        game.state.start("MenuState");
    
    },

    disconnectOnClick: function() {

        // For debug
        ConsoleManager.log("LobbyState::disconnectOnClick() : Running", false);

        AudioManager.gameButtonClick.play();

        NetworkManager.disconnect();

    },
    
    updateLobbyList: function() {

        // For debug
        ConsoleManager.log("LobbyState::updateLobbyList() : Running", false);
        ConsoleManager.log("Current page: " + LobbyState.lobbyPage, false);
        
        for(i = 0; i < 5; i += 1) {
            if(i >= LobbyState.lobbyList.length) {
                ConsoleManager.log("End of lobby list.", false);
                break;
            }
            
            LobbyState.lobbyList[i][0].destroy();
            LobbyState.lobbyList[i][1].destroy();
        }
        
        this.nextState = ((LobbyState.lobbyPage + 1) * 5 < LobbyState.lobbyCache.length);
        this.prevState = (LobbyState.lobbyPage > 0);
        
        // Text layer
        this.buttonNextPage[0].inputEnabled = this.nextState;
        this.buttonNextPage[0].alpha = this.nextState;
        this.buttonPrevPage[0].inputEnabled = this.prevState;
        this.buttonPrevPage[0].alpha = this.prevState;
        
        // Image layer
        this.buttonNextPage[1].inputEnabled = this.nextState;
        this.buttonNextPage[1].alpha = this.nextState;
        this.buttonPrevPage[1].inputEnabled = this.prevState;
        this.buttonPrevPage[1].alpha = this.prevState;
        
        for(i = 0; i < 5; i++) {
            item = i + (5 * LobbyState.lobbyPage);
            
            if(LobbyState.lobbyCache.length < item + 1) {
                ConsoleManager.log("End of lobby list.", false);
                break;
            }

            ConsoleManager.log(
                "Found lobby: [id: " + LobbyState.lobbyCache[item].id + 
                ", name: " + LobbyState.lobbyCache[item].name + 
                ", host: " + LobbyState.lobbyCache[item].host + 
                ", slots: " + LobbyState.lobbyCache[item].slots + 
                ", players: " + LobbyState.lobbyCache[item].players + "]",

                false
            );
            
            var currentLobbyID = LobbyState.lobbyCache[item].id;
            LobbyState.lobbyList[i] = GUIManager.createButton(
                // Lobby name
                'Lobby: ' + LobbyState.lobbyCache[item].name + 
                " | Host: " + LobbyState.lobbyCache[item].host + 
                " | Players: " + (LobbyState.lobbyCache[item].players == "" ? "None" : LobbyState.lobbyCache[item].players), 
                
                // Button position
                ScreenData.viewportWidth / 2, 
                160 + (70 * i), 

                // Button style
                '#FFFFFF', // Text
                "buttonBlueBarNormal", // Button image

                // OnClick Callback
                function(){ NetworkManager.request("connector.entryHandler.onEnterLobby", {lobbyId: currentLobbyID, playerName: "unknown"}, ProtocolManager.onEnterLobby); }
            );
        }
    }
}