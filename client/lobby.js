
var STATE_LOBBY = {

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

        // Add tiled background
        tileBackground('menuBackground');
        
        // Add smoke
        smokeBackground('backgroundSmoke');
        
        // Add border
        borderBackground('woodBorder');

        var charText = game.add.text(0, 0, 'Select a Lobby', {font: "40px Calibri", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
        charText.setTextBounds(0, 50, screenWidth, 50);
        
        var serverText = game.add.text(0, 0, 'Server: ', {font: "14px Calibri", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
        
        var buttonMenu = createLabelButton('Menu', viewportWidth / 2 - (110*3), viewportHeight - 70, '#FFFFFF', "bGreenNormal", this.menuOnClick, labelHover, labelOut);
        var buttonRefreshLobby = createLabelButton('Refresh List', viewportWidth / 2 - (110*1), viewportHeight - 70, '#FFFFFF', "bGreenNormal", this.refreshOnClick, labelHover, labelOut);
        var buttonCreateLobby = createLabelButton('Create Lobby', viewportWidth / 2 + (110*1), viewportHeight - 70, '#FFFFFF', "bGreenNormal", function(){ menuToggle("lobby-create"); }, labelHover, labelOut);
        var buttonServerDisconnect = createLabelButton('Disconnect', viewportWidth / 2 + (110*3), viewportHeight - 70, '#FFFFFF', "bRedNormal", function(){ NetworkManager.disconnect(); }, labelHover, labelOut);
        
	    buttonNextPage = createLabelButton('>', viewportWidth / 2 + 460, viewportHeight / 2, '#FFFFFF', "bGreenArrowNormal", this.nextPageOnClick, labelHover, labelOut);
	    buttonPrevPage = createLabelButton('<', viewportWidth / 2 - 460, viewportHeight / 2, '#FFFFFF', "bGreenArrowNormal", this.prevPageOnClick, labelHover, labelOut);
	    buttonPrevPage[1].angle = 180;
        
        this.refreshOnClick();
        
    },
    
    render: function() {
        
        serverText.setText("Server: " + serverHost + ":" + serverPort);
        
    },
    
    
    refreshOnClick: function() {
    
        if(networkState()) {
            NetworkManager.request("connector.entryHandler.onGetLobbies", "", ProtocolManager.onGetLobbies);
        }
        
    },

    createOnClick: function() {
        
        if(networkState()){
            NetworkManager.request("connector.entryHandler.onCreateLobby", {lobbyName: $('#lobby-name').val(), lobbyHost: $('#lobby-host').val()}, ProtocolManager.onCreateLobby);
        }
        
    },
    
    nextPageOnClick: function() {
        lobbyPage += 1;
        
        //this.updateLobbyList();
        lobbyState.updateLobbyList();
    },
    
    prevPageOnClick: function() {
        lobbyPage -= 1;
        
        //this.updateLobbyList();
        lobbyState.updateLobbyList();
    },
    
    emptyDrawList: function() {

        
    },
    
    menuOnClick: function() {

        gameButtonClick.play();
        
        game.state.start("STATE_MENU");
    
    },
    
    updateLobbyList: function() {
        
		if(lobbyList.length > 0) {
			for(i = 0; i < 5; i += 1) {
			    lobbyList[i][0].destroy();
			    lobbyList[i][1].destroy();
			}
		}
        
		if(lobbyCache.length > 5) {
		    var nextState = ((lobbyPage + 1) * 5 < lobbyCache.length);
		    var prevState = (lobbyPage > 0);
		    
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
    		
    	    console.log("Found lobby: ");
    	    console.log(" > ID: " + lobbyCache[item].id);
    	    console.log(" > Name: " + lobbyCache[item].name);
    	    console.log(" > Host: " + lobbyCache[item].host);
    	    console.log(" > Slots: " + lobbyCache[item].slots);
    	    console.log(" > Players: " + lobbyCache[item].players);
    	    
    	    lobbyList[i] = createLabelButton('Lobby: ' + lobbyCache[item].name + " | Host: " + lobbyCache[item].host + " | Players: " + (lobbyCache[item].players == "" ? "None" : lobbyCache[item].players), viewportWidth / 2, 160 + (70 * i), '#FFFFFF', "bBlueBarNormal", function(){ lobbyConnect(lobbyCache[item].id); }, labelHover, labelOut)
    	}
    }
}