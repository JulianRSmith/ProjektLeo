
var PlayerData = {
    
    _pCharacter: "",
    _pXPos: 0,
    _pYPos: 0,
    _pAttackState: 0,
    
    setSelectedCharacter: function(char) {
        
        // For debug
        ConsoleManager.log("PlayerData::setSelectedCharacter() : Running", false);

        _pCharacter = char;

    },
    
    getSelectedCharacter: function() {

        // For debug
        ConsoleManager.log("PlayerData::getSelectedCharacter() : Running", false);

        return _pCharacter;

    }
    
}