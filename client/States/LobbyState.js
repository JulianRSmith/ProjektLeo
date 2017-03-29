
var LobbyState = {

    serverText: 0,
    lobbyText: 0,
    lobbyPage: 0,

    lobbyList: 0,

    buttonMenu: 0,
    buttonRefreshLobby: 0,
    buttonCreateLobby: 0,
    buttonServerDisconnect: 0,

    nextState: 0,
    prevState: 0,

    create: function () {

        // For debug
        console.log("LobbyState::create() : Running");

        // Set game world size
        game.world.setBounds(0, 0, ScreenData.viewportWidth, ScreenData.viewportHeight);

        // Background objects
        GUIManager.backgroundTile('menuBackground');
        GUIManager.backgroundSmoke('backgroundSmoke');
        GUIManager.backgroundBorder('woodBorder');

        // Setup lobby page
        this.lobbyPage = 0;

        // Text objects
        this.serverText = game.add.text(10, 40, 'Server: ' + SettingsManager.serverIP + " | " + (NetworkManager.connected() ? "" : "Not ") + "Connected", {font: "14px Calibri", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
        this.lobbyText = game.add.text(0, 0, 'Select a Lobby', {font: "40px Calibri", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
        this.lobbyText.setTextBounds(0, 30, ScreenData.screenWidth, 50);
        
        // Menu buttons 
        this.buttonCreateLobby = GUIManager.createButton('Create Lobby', ScreenData.viewportWidth / 2 - (110*3), ScreenData.viewportHeight - 70, '#FFFFFF', "buttonGreenNormal", function(){ menuToggle("lobby-create"); });
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

        this.serverText.setText("Server: " + SettingsManager.serverIP + " | " + (NetworkManager.connected() ? "" : "Not ") + "Connected" + " | Page: " + (this.lobbyPage + 1));
        
    },

    
    refreshOnCreate: function() {

        // For debug
        console.log("LobbyState::refreshOnCreate() : Running");

        if(NetworkManager.connected()) {
            NetworkManager.request("connector.entryHandler.onGetLobbies", "", ProtocolManager.onGetLobbies);
        }
        
    },
    
    refreshOnClick: function() {

        // For debug
        console.log("LobbyState::refreshOnClick() : Running");

        AudioManager.gameButtonClick.play();
    
        if(NetworkManager.connected()) {
            NetworkManager.request("connector.entryHandler.onGetLobbies", "", ProtocolManager.onGetLobbies);
        }
        
    },

    createOnClick: function() {

        // For debug
        console.log("LobbyState::createOnClick() : Running");

        AudioManager.gameButtonClick.play();
        
        if(NetworkManager.connected()){
            NetworkManager.request("connector.entryHandler.onCreateLobby", {lobbyName: $('#lobby-name').val(), lobbyHost: $('#lobby-host').val()}, ProtocolManager.onCreateLobby);
        }
        
    },
    
    nextPageOnClick: function() {

        // For debug
        console.log("LobbyState::nextPageOnClick() : Running");

        AudioManager.gameButtonClick.play();

        lobbyPage += 1;

        LobbyState.updateLobbyList();

    },
    
    prevPageOnClick: function() {

        // For debug
        console.log("LobbyState::prevPageOnClick() : Running");

        AudioManager.gameButtonClick.play();

        lobbyPage -= 1;

        LobbyState.updateLobbyList();

    },
    
    menuOnClick: function() {

        // For debug
        console.log("LobbyState::menuOnClick() : Running");

        AudioManager.gameButtonClick.play();
        
        game.state.start("MenuState");
    
    },

    disconnectOnClick: function() {

        // For debug
        console.log("LobbyState::disconnectOnClick() : Running");

        AudioManager.gameButtonClick.play();

        NetworkManager.disconnect();

    },
    
    updateLobbyList: function() {

        // For debug
        console.log("LobbyState::updateLobbyList() : Running");

        console.log("Current page: " + lobbyPage);
        
        for(i = 0; i < 5; i += 1) {
            if(i >= lobbyList.length) {
                console.log("End of lobby list.");
                break;
            }
            
            lobbyList[i][0].destroy();
            lobbyList[i][1].destroy();
        }
        
        this.nextState = ((lobbyPage + 1) * 5 < lobbyCache.length);
        this.prevState = (lobbyPage > 0);
        
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
            item = i + (5 * lobbyPage);
            
            if(lobbyCache.length < item + 1) {
                console.log("End of lobby list.");
                break;
            }

            console.log("Found lobby: [id: " + lobbyCache[item].id + ", name: " + lobbyCache[item].name + ", host: " + lobbyCache[item].host + ", slots: " + lobbyCache[item].slots + ", players: " + lobbyCache[item].players + "]");
            
            lobbyList[i] = GUIManager.createButton('Lobby: ' + lobbyCache[item].name + " | Host: " + lobbyCache[item].host + " | Players: " + (lobbyCache[item].players == "" ? "None" : lobbyCache[item].players), ScreenData.viewportWidth / 2, 160 + (70 * i), '#FFFFFF', "buttonBlueBarNormal", function(){ lobbyConnect(lobbyCache[item].id); })
        }
    }
}