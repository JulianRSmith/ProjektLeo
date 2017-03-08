var network = {

	/**
	 * Sends a request to the server and specified route then sends the response to the callback method.
	 */
	request: function(host, port, callback) {
		pomelo.init({host: host, port: port, log: true}, callback);
	}
	
}