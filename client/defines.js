// Server address
var serverHost = "127.0.0.1";
var serverPort = 3010;

// If connected to server or not, fetched by networkState()
var networkConnected = false;

// Used for lobby
var serverText = "";

// Get the width of the users screen
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

// Keep these values just for future access based on their name
var viewportWidth = screenWidth;
var viewportHeight = 600;

// The width of the game itself
var gameWidth = 1920;
// The buffer height of the play area from the bottom
var gameHeightBuffer = 50;
// The total screen height including the buffer
var gameHeight = viewportHeight - gameHeightBuffer;


// In-game (play state) values
var gameFloor;
var healthBar;
var hit = 200;

var player2;


// For game lobby
var lobbyList = [];
var lobbyCache = [];

var lobbyPageButtons = [];
var lobbyPage = 0;

var buttonNextPage;
var buttonPrevPage;