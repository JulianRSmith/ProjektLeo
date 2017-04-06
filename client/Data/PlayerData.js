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
    playerName: "Waiting...",
    playerCharacter: "Waiting...",

    playerPosX: 0,
    playerPosY: 0,
    playerAttackState: 0,
    
    setSelectedCharacter: function (characterName) {
        this.playerCharacter = characterName
    },
    
    getSelectedCharacter: function () {
        return this.playerCharacter
    }
}