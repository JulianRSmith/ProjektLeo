/************************************************************

    This object handles saving and validation of server 
    settings.

    // TODO:
        A button for changing the playername is needed
        and saving of name should be handled here.

************************************************************/

var SettingsManager = {

    serverIP: "projectge.com",
    serverPort: 2020,
    debugToasts: true,

    saveSettings: function() {

        // For debug
        ConsoleManager.log("SettingsManager::saveServerSettings() : Running", false);

        DOMManager.menuToggle('server-settings');

        if(this.validateHost($("#server-ip").val()) && this.validatePort($('#server-port').val())) {
            if(NetworkManager.connected()) {
                NetworkManager.disconnect();
            }
            
            this.serverIP = $('#server-ip').val();
            this.serverPort = $('#server-port').val();
            this.debugToasts = ($('#debug-toasts').val() == 'true');
            PlayerData.playerName = $('#player-name').val();
            
            ConsoleManager.success("Settings have been applied.", true);
        }
        else {
            DOMManager.menuToggle('ss-error');
        }

    },

    validateHost: function(serverHost) {

        // For debug
        ConsoleManager.log("SettingsManager::validateHost() : Running", false);

        // Check for IPv4 address (example: 127.0.0.1)
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(serverHost)) {  
            return true;
        }
        // Check for domain name (example: example.com)
        else if(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(serverHost)) {
            return true;
        }
        else if(serverHost == "localhost") { 
            return true;
        }

        return false;

    },

    validatePort: function(serverPort) {

        // For debug
        ConsoleManager.log("SettingsManager::validatePort() : Running", false);

        if(!isNaN(serverPort)) {
            if(serverPort < 65535 && serverPort > 0){
                return true;
            }
        }

        return false;

    }
}