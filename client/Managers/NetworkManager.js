/************************************************************

    This object makes an easy wrapper for the pomelo server
    framework.

************************************************************/

var NetworkManager = {

    sfs: 0,
    networkConnected: false,
    
    /**
     * Opens a connection with the server.
     */
    connect: function(host, port) {
        
        // For debug
        ConsoleManager.log("NetworkManager::connect() : Running", false);
        ConsoleManager.log("NetworkManager::connect() : " + host + ":" + parseInt(port), false);

    	// Create configuration object
    	var config = {};
    	config.host = host;
    	config.port = parseInt(port);
    	config.zone = "BasicExamples";
    	config.debug = false;
    	
    	// New client
        sfs = new SFS2X.SmartFox(config);
            
    	// Set logging level
    	sfs.logger.level = SFS2X.LogLevel.ERROR;

    	// Add event listeners
    	sfs.addEventListener(SFS2X.SFSEvent.CONNECTION, ProtocolManager.onConnect, this);
	    sfs.addEventListener(SFS2X.SFSEvent.CONNECTION_LOST, ProtocolManager.onDisconnect, this);

        sfs.addEventListener(SFS2X.SFSEvent.LOGIN_ERROR, ProtocolManager.onLoginError, this);
        sfs.addEventListener(SFS2X.SFSEvent.LOGIN, ProtocolManager.onLogin, this);

        sfs.addEventListener(SFS2X.SFSEvent.ROOM_JOIN_ERROR, ProtocolManager.onRoomJoinError, this);
        sfs.addEventListener(SFS2X.SFSEvent.ROOM_JOIN, ProtocolManager.onRoomJoin, this);

        sfs.addEventListener(SFS2X.SFSEvent.ROOM_ADD, ProtocolManager.onRoomAdd, this);
        sfs.addEventListener(SFS2X.SFSEvent.ROOM_REMOVE, ProtocolManager.onRoomRemove, this);
        
        sfs.addEventListener(SFS2X.SFSEvent.USER_ENTER_ROOM, ProtocolManager.onUserEnterRoom, this);
        sfs.addEventListener(SFS2X.SFSEvent.USER_EXIT_ROOM, ProtocolManager.onUserExitRoom, this);

        sfs.addEventListener(SFS2X.SFSEvent.USER_VARIABLES_UPDATE, ProtocolManager.onUserVariablesUpdate, this);
    	
    	// Connect
    	sfs.connect();
    	
    },
       
    /**
     * Disconnects the client from the server.
     */
    disconnect: function() {

        // For debug
        ConsoleManager.log("NetworkManager::disconnect() : Running", false);

        this.networkConnected = false;

        sfs.disconnect();

    },

    /**
     * Returns true if the server is connected or false if not.
     */
    connected: function() {

        // For debug
        ConsoleManager.log("NetworkManager::connected() : Running", false);

        return this.networkConnected;

    }
    
}