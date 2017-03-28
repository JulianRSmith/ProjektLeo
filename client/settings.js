
var SettingsManager = {

    serverIP: "127.0.0.1",
    serverPort: 3010,

    saveServerSettings: function() {

        menuToggle('server-settings');
        
        if($("#server-ip").val() != "" && $('#server-port').val() != "") {
            if(NetworkManager.connected()){
                NetworkManager.disconnect();
            }
            
            this.serverIP = $('#server-ip').val();
            this.serverPort = $('#server-port').val();
            
            menuToggle('ss-confirm');
        }
        else {
            menuToggle('ss-error');
        }

    }

}