module.exports = function(app) {
	return new Handler(app);
};

var Handler = function(app) {
	this.app = app;
};

var lobbyList = {};
var playerList = {};
var socketList = {};

/**
 * Called when client connects to the server for the first time.
 */
Handler.prototype.onEntry = function(msg, session, next) {

	console.log('=========================================')
	console.log(msg)
	console.log('=========================================')

	console.log('=========================================')
	console.log(session)
	console.log('=========================================')

	console.log('=========================================')
	console.log(next)
	console.log('=========================================')

	// Setup a new player.
	var player = {
		playerID: session.id, 
		playerName: "No Name", 
		playerCharacter: ""
	};
	playerList[session.id] = player;

	// Return new player to client.
	next(null, { error: false, msg: "Welcome to the server!", playerData: player });
	next(null, { __route__: 'onGetPing', error: false, msg: "Welcome to the server!", playerData: player });

};

/**
 * Called when a client requests a list of lobbies on the server.
 */
Handler.prototype.onGetLobbies = function(msg, session, next) {

	next(null, { error: false, lobbyCount: lobbyList.length, lobbyData: lobbyList });

}

/**
 * Called when a client creates a new lobby on the server.
 */
Handler.prototype.onCreateLobby = function(msg, session, next) {

	// onCreateLobby requires a player name, so we can update their name here.
	playerList[session.id].playerName = msg.lobbyHost;
	
	// Create a new lobby in the list.
	var lobby = {
		id: Object.keys(lobbyList).length, 
		name: msg.lobbyName, 
		host: playerList[session.id].playerName, 
		slots: 2, 
		players: []
	};
	lobbyList[Object.keys(lobbyList).length] = lobby;

	// Return the new lobby to the user so they can automatically enter it.
	next(null, { error: false, lobby: lobby });

}

/**
 * Called when a client requests to enter a lobby.
 */
Handler.prototype.onEnterLobby = function(msg, session, next) {

	// Check if the lobby exists.
	if(lobbyList[msg.lobbyId]) {

		// Check that the lobby has a free slot.
		if(lobbyList[msg.lobbyId].players.length < lobbyList[msg.lobbyId].slots) {

			// Add the player to the list of players.
			lobbyList[msg.lobbyId].players.push(playerList[session.id]);

			// Return the lobby data to confirm the player joined.
			next(null, { error: false, lobby: lobbyList[msg.lobbyId] });
		}
		else {
			// Tell the player that the lobby is full.
			next(null, { error: true, msg: "Lobby is full." });
		}

	}
	else {

		// Tell the player that the lobby could not be found.
		next(null, { error: true, msg: "Lobby does not exist." });

	}

}

Handler.prototype.onGetPing = function(msg, session, next) {

	next(null, { error: false, msg: "ping" });

}

Handler.prototype.onDisconnect = function(msg, session, next) {

	next(null, { error: false, msg: "Disconnect requested." });
	kickBySessionId(session);

}