var protocol = {
    
	onConnect: function() { 
		pomelo.request("connector.entryHandler.entry", "Hello", function(data){ 
			console.log("protocol.onConnect(): " + data.msg); 
		});
	},
	
	onGetLobbies: function() {
		pomelo.request("connector.entryHandler.getLobbies", "", function(data){ 
			console.log("protocol.onGetLobbies():");
			console.log(data);
			
			for(i = 0; i < data.lobbyCount; i++) {
			    console.log("Found lobby: ");
			    console.log(" > Name: " + data.lobbyData[i].name);
			    console.log(" > Slots: " + data.lobbyData[i].slots);
			    console.log(" > Players: " + data.lobbyData[i].players);
			}
		});
	},
	
	onCreateLobby: function (){
		pomelo.request("connector.entryHandler.createLobby", "", function(data){ 
			console.log("protocol.onCreateLobby():");
			
			console.log("Created a lobby: ");
			console.log(" > Name:" + data.name);
			console.log(" > Slots:" + data.slots);
			console.log(" > Players:" + data.players);
		});
	}
	
}