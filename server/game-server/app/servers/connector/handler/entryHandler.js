module.exports = function(app) {
	return new Handler(app);
};

var Handler = function(app) {
	this.app = app;
};

var lobbyList = [];

Handler.prototype.entry = function(msg, session, next) {
	console.log(session);
	next(null, {code: 200, msg: 'Welcome to the server!'});
};

Handler.prototype.getLobbies = function(msg, session, next) {
	next(null, 
		{
			code: 200, 
			lobbyCount: lobbyList.length,
			lobbyData: lobbyList
		}
	)
}

Handler.prototype.createLobby = function(msg, session, next){
	lobbyList.push({name: "New Lobby", slots: 2, players: []});
	next(null, {code: 200, name: "New Lobby", slots: 2, players: []});
}

