var network = {

	connect: function(host, port) {
		debugText.text += "Connecting to server " + host + ":" + port + "..."
		pomelo.init({host: host, port: port, log: true}, function() {
			pomelo.request("connector.entryHandler.entry", "Hello", function(data) {4
				debugText.text += "\nConnected";
				debugText.text += "\nServer Message: " + data.msg;
			});
		});

		pomelo.on('disconnect', function(reason) {
			debugText.text += "Server Message: " + reason;
		});
	}
}