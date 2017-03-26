
var lobbyState = {

    create: function () {
    
        tiledBackgroundX('charBg');
        
        var charText = game.add.text(0, 0, 'Select a Lobby', {font: "40px Calibri", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
        charText.setTextBounds(0, 50, screenWidth, 50);
        
        serverText = game.add.text(0, 0, 'Server: ', {font: "14px Calibri", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
        
        var buttonMenu = createLabelButton('Menu', viewportWidth / 2 - (110*3), viewportHeight - 70, '#FFFFFF', "bGreenNormal", returnMenuOnClick, labelHover, labelOut);
        var buttonRefreshLobby = createLabelButton('Refresh List', viewportWidth / 2 - (110*1), viewportHeight - 70, '#FFFFFF', "bGreenNormal", this.refreshLobbyList, labelHover, labelOut);
        var buttonCreateLobby = createLabelButton('Create Lobby', viewportWidth / 2 + (110*1), viewportHeight - 70, '#FFFFFF', "bGreenNormal", function(){ menuToggle("lobby-create"); }, labelHover, labelOut);
        var buttonServerDisconnect = createLabelButton('Disconnect', viewportWidth / 2 + (110*3), viewportHeight - 70, '#FFFFFF', "bRedNormal", function(){ network.disconnect(); }, labelHover, labelOut);
        
	    buttonNextPage = createLabelButton('>', viewportWidth / 2 + 460, viewportHeight / 2, '#FFFFFF', "bGreenArrowNormal", lobbyState.nextPage, labelHover, labelOut);
	    buttonPrevPage = createLabelButton('<', viewportWidth / 2 - 460, viewportHeight / 2, '#FFFFFF', "bGreenArrowNormal", lobbyState.prevPage, labelHover, labelOut);
	    buttonPrevPage[1].angle = 180;
        
        this.refreshLobbyList();
        
    },
    
    render: function() {
        
        serverText.setText("Server: " + serverHost + ":" + serverPort);
        
    },
    
    
    refreshLobbyList: function() {
    
        if(networkState()) {
            network.request("connector.entryHandler.onGetLobbies", "", protocol.onGetLobbies);
        }
        
    },

    createLobby: function() {
        
        if(networkState()){
            network.request("connector.entryHandler.onCreateLobby", {lobbyName: $('#lobby-name').val(), lobbyHost: $('#lobby-host').val()}, protocol.onCreateLobby);
        }
        
    },
    
    nextPage: function() {
        lobbyPage += 1;
        
        //this.updateLobbyList();
        lobbyState.updateLobbyList();
    },
    
    prevPage: function() {
        lobbyPage -= 1;
        
        //this.updateLobbyList();
        lobbyState.updateLobbyList();
    },
    
    emptyDrawList: function() {

        
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