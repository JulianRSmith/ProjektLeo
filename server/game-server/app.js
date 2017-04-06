var pomelo = require('pomelo');

var app = pomelo.createApp();
app.set('name', 'server');

app.configure('production|development', 'connector', function(){
	app.set('connectorConfig',
	{
		connector : pomelo.connectors.hybridconnector,
		heartbeat : 3,
		useDict : true,
		useProtobuf : true,
		handshake : function(msg, cb){
			cb(null, {});
		}
	});
});

app.configure('production|development', 'hybrid-connector', function(){
    app.set('connectorConfig',
    {
        connector : pomelo.connectors.hybridconnector,
        heartbeat : 3,
        useDict: true,
        useProtobuf: true
    });
});

app.start();

process.on('uncaughtException', function (err) {
	console.error(' Caught exception: ' + err.stack);
});
