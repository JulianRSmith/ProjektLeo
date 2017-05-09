/************************************************************

    This object is a way to store data for the player.
    We can keep track of:
    
    Player Name.
    Player Character. (the character they selected)

    Player X and Y Positions. (location in game world)
    Player Attack State. (which attack they are using)

************************************************************/

var PlayerData = {
    
    playerId: "Waiting...",
    playerName: "Unknown Gladiator [" + String(Math.floor(Math.random() * 9999)) + "]",
    playerCharacter: "Waiting...",
    playerReady: 0,

    playerAttackState: 0,

    currentState: "",

    
    /**
    * Sets the selected character.
    */
    setSelectedCharacter: function (characterName) {
        this.playerCharacter = characterName
    },
    
    /**
    * Gets the selected character.
    */
    getSelectedCharacter: function () {
        return this.playerCharacter
    },
    
    /**
    * Generates an enemy player when playing in singleplayer
    */
    generateEnemyPlayer: function(characterName) {
        var charList = ["playerLeo","playerBoud","playerCleo"];
        for (var i = 0;i < charList.length;i++) {
            if (charList[i] == characterName) {
                charList.splice(i, 1);
            }
        }
        var pickChar = game.rnd.integerInRange(0, 1);
        ConsoleManager.log(pickChar, false)
        var enemyChar = charList[pickChar];
        ConsoleManager.log(enemyChar, false)
        return enemyChar;
    },

    /**
    * Resets the object back to the default values
    */
    reset: function() {

        playerId = "Waiting...";
        playerCharacter = "Waiting...";
        playerAttackState = 0;
        currentState = "";
        
    }
};