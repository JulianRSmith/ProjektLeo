module.exports = function(app) {
	return new Handler(app);
};

var Handler = function(app) {
	this.app = app;
};

var lobbyList = [];

Handler.prototype.onEntry = function(msg, session, next) {

	next(null, { error: false, msg: "Welcome to the server!" });

};

Handler.prototype.onGetLobbies = function(msg, session, next) {

	next(null, { error: false, lobbyCount: lobbyList.length, lobbyData: lobbyList});

}

Handler.prototype.onCreateLobby = function(msg, session, next){

	var lobby = {id: lobbyList.length, name: msg.lobbyName, host: msg.lobbyHost, slots: 2, players: []};

	lobbyList.push(lobby);
	
	next(null, { error: false, lobby: lobby });

}

Handler.prototype.onEnterLobby = function(msg, session, next) {

	if(lobbyList[msg.lobbyId]) { 
		next(null, { error: false, lobby: lobbyList[msg.lobbyId] });
	}
	else {
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