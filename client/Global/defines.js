// If connected to server or not, fetched by NetworkManager.connected()
var networkConnected = false;

// In-game (play state) values
var gameFloor;
var healthBar;
var hit = 200;

var player2;

// TODO: MOVE TO OWN OBJECT
// For game lobby
var lobbyList = [];
var lobbyCache = [];
var lobbyPageButtons = [];
var lobbyPage = 0;