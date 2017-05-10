/************************************************************
	NetPlayer.js

	A way to keep track of the other player's data.
************************************************************/

var NetPlayer = {

	playerName: 0,
	playerChar: 0,
    playerReady: 0,
	playerInChar: 0,

	playerX: 0,
	playerY: 0,

    playerAttackState: 0,
    
    setPlayer: function(thePlayerName) {
    	this.playerChar = thePlayerName;
    },

	reset: function() {

		playerChar = 0;
    	playerReady = 0;
    	playerInChar = 0;

		playerX = 0;
		playerY = 0;

    	playerAttackState = 0;

	}
	
}