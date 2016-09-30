"use strict";
var request = require( "request" );
var cheerio = require( "cheerio" );

function PollController() {}

PollController.get = get;

function get( req, res ) {
  var url = "http://www.realclearpolitics.com/epolls/2016/president/us/general_election_trump_vs_clinton_vs_johnson-5949.html";

  request( url, function( error, response, body ) {
    if ( !error && response.statusCode === 200 ) {

      var $ = cheerio.load( body );
      var clinton = $( "#polling-data-rcp .rcpAvg td:nth-child(5)" ).text();
      var drumpf = $( "#polling-data-rcp .rcpAvg td:nth-child(6)" ).text();
      var johnson = $( "#polling-data-rcp .rcpAvg td:nth-child(7)" ).text();

      res.json( [
        {
          name: "Hilary Clinton",
          percentage: clinton,
          image: "public/img/clinton.png",
          quotes: []
        },
        {
          name: "Donald Drumph",
          percentage: drumpf,
          image: "public/img/drumph.png",
          quotes: [
            {
              source: "http://www.marieclaire.co.uk/entertainment/people/donald-trump-quotes-57213",
              quote: "An ‘extremely credible source’ has called my office and told me that Barack Obama’s birth certificate is a fraud"
            }
          ]
        },
        {
          name: "Gary Johnson",
          percentage: johnson,
          image: "public/img/johnson.png",
          quotes: []
         }
      ] );
    } else {
      res.json( {
        error: error
      } );
    }
  } );
}

module.exports = PollController;
