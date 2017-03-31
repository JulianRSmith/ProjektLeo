/************************************************************

    This object makes an easy wrapper for the pomelo server
    framework.

************************************************************/

var NetworkManager = {

    networkConnected: false,
    
    /**
     * Opens a connection with the server.
     */
    connect: function(host, port) {

        // For debug
        ConsoleManager.log("NetworkManager::connect() : Running", false);

        pomelo.init({host: host, port: port, log: true}, function(){ ConsoleManager.success("Connected to server!", true); NetworkManager.networkConnected = true; }, false);
        
        pomelo.on('onGetPing', function(){ ConsoleManager.log('Server has sent a ping.', false); });

    },
    
    /**
     * Sends a request to the server and specified route then sends the response to the callback method.
     */
    request: function(route, data, callback) {

        // For debug
        ConsoleManager.log("NetworkManager::request() : Running", false);

        pomelo.request(route, data, callback);

    },
    
    /**
     * Disconnects the client from the server.
     */
    disconnect: function() {

        // For debug
        ConsoleManager.log("NetworkManager::disconnect() : Running", false);

        if(NetworkManager.connected()) {
            NetworkManager.request("connector.entryHandler.onDisconnect", "", ProtocolManager.onDisconnect);
        }

    },

    /**
     * Returns true if the server is connected or false if not.
     */
    connected: function() {

        // For debug
        // ConsoleManager.log("NetworkManager::connected() : Running", false);

        return this.networkConnected;

    }
    
}