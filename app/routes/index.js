"use strict";

var path = process.cwd();
var QuoteController = require( path + "/app/controllers/quoteController.server.js" );
var PollController = require( path + "/app/controllers/pollController.server.js" );
var AuthController = require( path + "/app/controllers/authController.server.js" );

module.exports = function( app, db ) {
	var quoteController = new QuoteController( db );

	app.route( [ "/", "/admin" ] )
		.get( function( req, res ) {
			res.sendFile( path + "/public/index.html" );
		} );

	app.route( "/api/quotes" )
		.get( quoteController.getQuotes )
		.post( quoteController.addQuote );

	app.route( "/api/quotes/:id" )
		.post( quoteController.updateQuote )
		.delete( quoteController.removeQuote );

  app.route( "/api/polls" )
    .get( PollController.get );

  app.route( "/api/auth/:guid" )
		.get( AuthController.get );
};
