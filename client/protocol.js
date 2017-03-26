var lobbyButtons = [];
var protocol = {
    
    /**
     * Called when the client connects to the server.
     */
	onConnect: function(data) { 
		console.log("protocol.onConnect(): " + data.msg);
	},
	
    /**
     * Called when the server gives the client a lobby list.
     */
	onGetLobbies: function(data) {
		console.log("protocol.onGetLobbies():");
		console.log(data);
		
		if(lobbyButtons.length > 0) {
			for(i = 0; i < lobbyButtons.length; i++) {
				lobbyButtons[i].destroy();
			}
		}
		
		lobbyButtons = [];
		
		for(i = 0; i < data.lobbyCount; i++) {
		    console.log("Found lobby: ");
		    console.log(" > ID: " + data.lobbyData[i].id);
		    console.log(" > Name: " + data.lobbyData[i].name);
		    console.log(" > Host: " + data.lobbyData[i].host);
		    console.log(" > Slots: " + data.lobbyData[i].slots);
		    console.log(" > Players: " + data.lobbyData[i].players);
		    
		    var tmpButton = createLabelButton('| Lobby: ' + data.lobbyData[i].name + ' / Host: ' + data.lobbyData[i].host + '  |', viewportWidth / 2, viewportHeight / 2 + (32*i), '#FFFFFF', function(){ lobbyConnect(data.lobbyData[i].id); }, labelHover, labelOut)
		    lobbyButtons[i] = tmpButton;
		}
	},
	
    /**
     * Called when the server gives the client a new lobby.
     */
	onCreateLobby: function (data){
		console.log("protocol.onCreateLobby():");
		
		console.log("Created a lobby: ");
		console.log(" > ID:" + data.id);
		console.log(" > Name:" + data.name);
		console.log(" > Host:" + data.host);
		console.log(" > Slots:" + data.slots);
		console.log(" > Players:" + data.players);
		
		lobbyState.refreshLobbyList();
	}
	
}