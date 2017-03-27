
var NetworkManager = {
	
	/**
	 * Opens a connection with the server.
	 */
	connect: function(host, port) {
		pomelo.init({host: host, port: port, log: true}, function(){ console.log("Connected to server!"); networkConnected = true; });
		
		pomelo.on('onGetPing', function(){ console.log('Server has sent a ping.'); });
	},
	
	/**
	 * Sends a request to the server and specified route then sends the response to the callback method.
	 */
	request: function(route, data, callback){
		pomelo.request(route, data, callback);
	},
	
	disconnect: function(){
	    if(networkState()) {
	        network.request("connector.entryHandler.onDisconnect", "", protocol.onDisconnect);
	    }
	}
	
}