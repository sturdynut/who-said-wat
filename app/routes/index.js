"use strict";

var path = process.cwd();
var ClickHandler = require( path + "/app/controllers/clickHandler.server.js" );
var PollController = require( path + "/app/controllers/pollController.server.js" );

module.exports = function( app, db ) {
	var clickHandler = new ClickHandler( db );

	app.route( "/" )
		.get( function( req, res ) {
			res.sendFile( path + "/public/index.html" );
		} );

	app.route( "/admin" )
		.get( function( req, res ) {
			res.sendFile( path + "/public/index.html" );
		} );

	app.route( "/api/clicks" )
		.get( clickHandler.getClicks )
		.post( clickHandler.addClick )
		.delete( clickHandler.resetClicks );

  app.route( "/api/polls" )
    .get( PollController.get );
};
