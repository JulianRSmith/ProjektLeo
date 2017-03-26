
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
		
		lobbyCache = data.lobbyData;
		
		lobbyState.updateLobbyList();
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
		
		//menuToggle('lc-confirm');
	},
	
	onDisconnect: function(data) {
		console.log("Disconnected, reason: " + data.msg);
		
		networkConnected = false;
		
        game.state.start("menu");
	}
	
}