/************************************************************
	NetPlayer.js

	A way to keep track of the other player's data
************************************************************/

var NetPlayer = {
	playerChar: 0,
	playerName: 0,

	playerX: 0,
	playerY: 0,

    playerAttackState: 0,

	reset: function() {

		playerChar = 0;
		playerName = 0;

		playerX = 0;
		playerY = 0;

    	playerAttackState = 0;

	}
}