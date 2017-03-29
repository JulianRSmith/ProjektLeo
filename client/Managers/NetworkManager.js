
var NetworkManager = {
    
    /**
     * Opens a connection with the server.
     */
    connect: function(host, port) {

        // For debug
        console.log("NetworkManager::connect() : Running");

        pomelo.init({host: host, port: port, log: true}, function(){ console.log("Connected to server!"); networkConnected = true; });
        
        pomelo.on('onGetPing', function(){ console.log('Server has sent a ping.'); });

    },
    
    /**
     * Sends a request to the server and specified route then sends the response to the callback method.
     */
    request: function(route, data, callback) {

        // For debug
        console.log("NetworkManager::request() : Running");

        pomelo.request(route, data, callback);

    },
    
    /**
     * Disconnects the client from the server.
     */
    disconnect: function() {

        // For debug
        console.log("NetworkManager::disconnect() : Running");

        if(NetworkManager.connected()) {
            NetworkManager.request("connector.entryHandler.onDisconnect", "", ProtocolManager.onDisconnect);
        }

    },

    /**
     * Returns true if the server is connected or false if not.
     */
    connected: function() {

        // For debug
        // console.log("NetworkManager::connected() : Running");

        return networkConnected;

    }
    
}