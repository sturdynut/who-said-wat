"use strict";

try {
	var dotenv = require( "dotenv" );
	dotenv.load();
}
catch ( e ) {
	console.log( "Error loading dotenv", e );
}

var express = require( "express" );
var mongo = require( "mongodb" ).MongoClient;
var bodyParser = require( "body-parser" );
var routes = require( "./app/routes/index.js" );

var app = express();

mongo.connect( process.env.Mongo_URI, function( err, db ) {

	if ( err ) {
		throw new Error( "Database failed to connect!" );
	} else {
		console.log( "MongoDB successfully connected on port 27017." );
	}

	app.use( "/_common", express.static( process.cwd() + "/app/_common" ) );
	app.use( "/models", express.static( process.cwd() + "/app/models" ) );
	app.use( "/services", express.static( process.cwd() + "/app/services" ) );
	app.use( "/directives", express.static( process.cwd() + "/app/directives" ) );
	app.use( "/controllers", express.static( process.cwd() + "/app/controllers" ) );
	app.use( "/components", express.static( process.cwd() + "/app/components" ) );
	app.use( "/public", express.static( process.cwd() + "/public" ) );

	app.use( require( "body-parser" ).json( { limit: "5mb" } ) );
  app.use( require( "body-parser" ).urlencoded( { extended: false } ) );

	routes( app, db );

	var port = process.env.PORT || 3000;
	app.listen( port, function() {
		console.log( "Node.js listening on port " + port + "..." );
	} );

} );

