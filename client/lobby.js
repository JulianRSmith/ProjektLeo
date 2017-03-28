
var STATE_LOBBY = {
    serverText: 0,
    lobbyText: 0,

    lobbyList: [],

    buttonMenu: 0,
    buttonRefreshLobby: 0,
    buttonCreateLobby: 0,
    buttonServerDisconnect: 0,

    nextState: 0,
    prevState: 0,

    create: function () {

        // Set game world size
        game.world.setBounds(0, 0, viewportWidth, viewportHeight);
            
        // Init sound for state
        gameMainTheme = game.add.audio('musicMenu');
        gameButtonClick = game.add.audio('soundButtonClick');
        gameButtonClick.allowMultiple = true;
        gameMainTheme.loop = true;
        //gameMainTheme.stop();
        //gameMainTheme.play();

        // Background objects
        GUIManager.backgroundTile('menuBackground');
        GUIManager.backgroundSmoke('backgroundSmoke');
        GUIManager.backgroundBorder('woodBorder');

        // Text objects
        serverText = game.add.text(10, 40, 'Server: ' + SettingsManager.serverIP + " | " + (NetworkManager.connected() ? "" : "Not ") + "Connected", {font: "14px Calibri", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
        lobbyText = game.add.text(0, 0, 'Select a Lobby', {font: "40px Calibri", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
        lobbyText.setTextBounds(0, 30, screenWidth, 50);
        
        // Menu buttons 
        buttonMenu = GUIManager.createButton('Menu', viewportWidth / 2 - (110*3), viewportHeight - 70, '#FFFFFF', "buttonGreenNormal", this.menuOnClick);
        buttonRefreshLobby = GUIManager.createButton('Refresh List', viewportWidth / 2 - (110*1), viewportHeight - 70, '#FFFFFF', "buttonGreenNormal", this.refreshOnClick);
        buttonCreateLobby = GUIManager.createButton('Create Lobby', viewportWidth / 2 + (110*1), viewportHeight - 70, '#FFFFFF', "buttonGreenNormal", function(){ menuToggle("lobby-create"); });
        buttonServerDisconnect = GUIManager.createButton('Disconnect', viewportWidth / 2 + (110*3), viewportHeight - 70, '#FFFFFF', "buttonRedNormal", this.disconnectOnClick);

        // Lobby buttons
        buttonNextPage = GUIManager.createButton('>', viewportWidth / 2 + 460, viewportHeight / 2, '#FFFFFF', "buttonGreenArrowNormal", this.nextPageOnClick);
        buttonPrevPage = GUIManager.createButton('<', viewportWidth / 2 - 460, viewportHeight / 2, '#FFFFFF', "buttonGreenArrowNormal", this.prevPageOnClick);
        buttonPrevPage[1].angle = 180;

        this.refreshOnCreate();
        
    },

    render: function() {

        serverText.setText("Server: " + SettingsManager.serverIP + " | " + (NetworkManager.connected() ? "" : "Not ") + "Connected");
        
    },

    
    refreshOnCreate: function() {

        if(NetworkManager.connected()) {
            NetworkManager.request("connector.entryHandler.onGetLobbies", "", ProtocolManager.onGetLobbies);
        }
        
    },
    
    refreshOnClick: function() {

        gameButtonClick.play();
    
        if(NetworkManager.connected()) {
            NetworkManager.request("connector.entryHandler.onGetLobbies", "", ProtocolManager.onGetLobbies);
        }
        
    },

    createOnClick: function() {

        gameButtonClick.play();
        
        if(NetworkManager.connected()){
            NetworkManager.request("connector.entryHandler.onCreateLobby", {lobbyName: $('#lobby-name').val(), lobbyHost: $('#lobby-host').val()}, ProtocolManager.onCreateLobby);
        }
        
    },
    
    nextPageOnClick: function() {

        gameButtonClick.play();

        lobbyPage += 1;
        STATE_LOBBY.updateLobbyList();

    },
    
    prevPageOnClick: function() {

        gameButtonClick.play();

        lobbyPage -= 1;
        STATE_LOBBY.updateLobbyList();

    },
    
    menuOnClick: function() {

        gameButtonClick.play();
        
        game.state.start("STATE_MENU");
    
    },

    disconnectOnClick: function() {

        gameButtonClick.play();

        NetworkManager.disconnect();

    },
    
    updateLobbyList: function() {
        
        if(lobbyList.length > 0) {
            for(i = 0; i < 5; i += 1) {
                if(i >= lobbyList.length) {
                    break;
                }
                
                lobbyList[i][0].destroy();
                lobbyList[i][1].destroy();
            }
        }
        
        if(lobbyCache.length > 5) {
            nextState = ((lobbyPage + 1) * 5 < lobbyCache.length);
            prevState = (lobbyPage > 0);
            
            // Text layer
            buttonNextPage[0].inputEnabled = nextState;
            buttonNextPage[0].alpha = nextState;
            buttonPrevPage[0].inputEnabled = prevState;
            buttonPrevPage[0].alpha = prevState;
            
            // Image layer
            buttonNextPage[1].inputEnabled = nextState;
            buttonNextPage[1].alpha = nextState;
            buttonPrevPage[1].inputEnabled = prevState;
            buttonPrevPage[1].alpha = prevState;
        }
        else {
            // Text layer
            buttonNextPage[0].inputEnabled = 0;
            buttonNextPage[0].alpha = 0;
            buttonPrevPage[0].inputEnabled = 0;
            buttonPrevPage[0].alpha = 0;
            
            // Image layer
            buttonNextPage[1].inputEnabled = 0;
            buttonNextPage[1].alpha = 0;
            buttonPrevPage[1].inputEnabled = 0;
            buttonPrevPage[1].alpha = 0;
        }
        
        for(i = 0; i < 5; i++) {
            item = i + (5 * lobbyPage);
            
            if(lobbyCache.length < item + 1) {
                console.log("End of lobby list.");
                break;
            }

            console.log("Found lobby: [id: " + lobbyCache[item].id + ", name: " + lobbyCache[item].name + ", host: " + lobbyCache[item].host + ", slots: " + lobbyCache[item].slots + ", players: " + lobbyCache[item].players + "]");
            
            lobbyList[i] = GUIManager.createButton('Lobby: ' + lobbyCache[item].name + " | Host: " + lobbyCache[item].host + " | Players: " + (lobbyCache[item].players == "" ? "None" : lobbyCache[item].players), viewportWidth / 2, 160 + (70 * i), '#FFFFFF', "buttonBlueBarNormal", function(){ lobbyConnect(lobbyCache[item].id); })
        }
    }
}