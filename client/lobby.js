var serverText;

var lobbyState = {

    create: function () {
    
        tiledBackgroundX('charBg');
        
        var charText = game.add.text(0, 0, 'Select a Lobby',{font: "40px Calibri", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
        charText.setTextBounds(0, 50, screenWidth, 50);
        
        serverText = game.add.text(0, 0, 'Server: ',{font: "14px Calibri", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
        
        var buttonMenu = createLabelButton('| Menu |', 10, viewportHeight - 32, '#FFFFFF', returnMenuOnClick, labelHover, labelOut);
        var buttonRefreshLobby = createLabelButton('| Refresh List |', 128, viewportHeight - 32, '#FFFFFF', this.refreshLobbyList, labelHover, labelOut);
        var buttonCreateLobby = createLabelButton('| Create Lobby |', 256, viewportHeight - 32, '#FFFFFF', function(){ menuToggle("lobby-create"); }, labelHover, labelOut);
        
        this.refreshLobbyList();
        
    },
    
    render: function() {
        serverText.setText("Server: " + serverHost + ":" + serverPort);
    },
    
    
    refreshLobbyList: function(){
        if(networkState()) {
            network.request("connector.entryHandler.onGetLobbies", "", protocol.onGetLobbies);
        }
    },

    createLobby: function() {
        if(networkState()){
            network.request("connector.entryHandler.onCreateLobby", {lobbyName: $('#lobby-name').val(), lobbyHost: $('#lobby-host').val()}, protocol.onCreateLobby);
        }
    }
    
}