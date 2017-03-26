module.exports = function(app) {
	return new Handler(app);
};

var Handler = function(app) {
	this.app = app;
};

var lobbyList = [];

Handler.prototype.onEntry = function(msg, session, next) {
	console.log(session);
	next(null, {code: 200, msg: 'Welcome to the server!'});
};

Handler.prototype.onGetLobbies = function(msg, session, next) {
	next(null, 
		{
			code: 200, 
			lobbyCount: lobbyList.length,
			lobbyData: lobbyList
		}
	)
}

Handler.prototype.onCreateLobby = function(msg, session, next){
	var lobby = {id: lobbyList.length, name: msg.lobbyName, host: msg.lobbyHost, slots: 2, players: []};

	lobbyList.push(lobby);
	
	next(null, lobby);
}

Handler.prototype.onGetPing = function(msg, session, next) {
	next(null, {code: 200});
}