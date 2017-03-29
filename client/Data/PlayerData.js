
var PlayerData = {
    
    _pCharacter: "",
    _pXPos: 0,
    _pYPos: 0,
    _pAttackState: 0,
    
    setSelectedCharacter: function(char) {
        
        // For debug
        console.log("PlayerData::setSelectedCharacter() : Running");

        _pCharacter = char;

    },
    
    getSelectedCharacter: function() {

        // For debug
        console.log("PlayerData::getSelectedCharacter() : Running");

        return _pCharacter;

    }
    
}