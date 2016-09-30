"use strict";

var express = require( "express" );
var mongo = require( "mongodb" ).MongoClient;

var routes = require( "./app/routes/index.js" );

var app = express();

mongo.connect( "mongodb://localhost:27017/talking-heads", function( err, db ) {

	if ( err ) {
		throw new Error( "Database failed to connect!" );
	} else {
		console.log( "MongoDB successfully connected on port 27017." );
	}

	app.use( "/_common", express.static( process.cwd() + "/app/_common" ) );
	app.use( "/models", express.static( process.cwd() + "/app/models" ) );
	app.use( "/services", express.static( process.cwd() + "/app/services" ) );
	app.use( "/controllers", express.static( process.cwd() + "/app/controllers" ) );
	app.use( "/components", express.static( process.cwd() + "/app/components" ) );
	app.use( "/public", express.static( process.cwd() + "/public" ) );

	routes( app, db );

	var port = 3000;
	app.listen( port, function() {
		console.log( "Node.js listening on port " + port + "..." );
	} );

} );

