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
    playerName: "Unknown Player",
    playerCharacter: "Waiting...",

    playerPosX: 0,
    playerPosY: 0,
    playerAttackState: 0,
    
    setSelectedCharacter: function (characterName) {
        this.playerCharacter = characterName
    },
    
    getSelectedCharacter: function () {
        return this.playerCharacter
    },
    
    generateEnemyPlayer: function(characterName) {
        var charList = ["playerLeo","playerBoud","playerCleo"];
        for (var i = 0;i < charList.length;i++) {
            if (charList[i] == characterName) {
                charList.splice(i, 1);
            }
        }
        var pickChar = game.rnd.integerInRange(0, 1);
        console.log(pickChar)
        var enemyChar = charList[pickChar];
        console.log(enemyChar)
        return enemyChar;
    }
};