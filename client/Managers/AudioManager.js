/************************************************************

    This object was made to prevent the need of initialising 
    the game music and sound in each state.

    Adding a new sound is as easy as defining it here and
    then adding it to the LoadState::create() function.

	// Example
    AudioManager.myNewaudio = game.add.audio('audioCache');

************************************************************/

var AudioManager = {

	gameMainTheme: 0,
	gameBattleTheme: 0,
	gameButtonClick: 0
	
}