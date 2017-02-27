var connector = {

	connect: function(host, port) {
		connected = false;

		pomelo.init({host: host, port: port, log: true}, function() {
			pomelo.request("connector.entryHandler.entry", "Hello", function(data) {
				debugText.text = "Connected!\nServer: " + data.msg;
				debugText.fill = "#66B266";
				debugText.boundsAlignH = "center"
				debugText.boundsAlignV = "middle"
			});
		});

		pomelo.on('disconnect', function(reason) {
			debugText.text = "Disconnected!\nServer: " + reason;
			debugText.fill = "#FF4C4C";
			debugText.boundsAlignH = "center"
			debugText.boundsAlignV = "middle"
		});
	}
}