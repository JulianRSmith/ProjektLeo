
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