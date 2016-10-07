"use strict";
var request = require( "request" );
var cheerio = require( "cheerio" );
var NodeCache = require( "node-cache" );
var myCache = new NodeCache( { stdTTL: 3600 } );
var cacheKey = "this_election_is_a_joke";

function PollController() {}

PollController.get = get;

function get( req, res ) {

  var url = "http://www.realclearpolitics.com/epolls/2016/president/us/general_election_trump_vs_clinton_vs_johnson-5949.html";
  var cachedResponse = myCache.get( cacheKey );

  console.log( "cachedResponse --> ", cachedResponse );

  if ( cachedResponse == undefined ) {

    request( url, function( error, response, body ) {
      var data = [];

      if ( !error && response.statusCode === 200 ) {

        var $ = cheerio.load( body );
        var clinton = $( "#polling-data-rcp .rcpAvg td:nth-child(5)" ).text();
        var drumpf = $( "#polling-data-rcp .rcpAvg td:nth-child(6)" ).text();
        var johnson = $( "#polling-data-rcp .rcpAvg td:nth-child(7)" ).text();

        data = [
          {
            name: "Hillary Clinton",
            short_name: "Clinton",
            percentage: clinton,
            image: "public/img/clinton.png",
            imageChin: "public/img/clinton-chin.png"
          },
          {
            name: "Donald Trump",
            short_name: "Trump",
            percentage: drumpf,
            image: "public/img/drumph.png",
            imageChin: "public/img/drumph-chin.png"
          },
          {
            name: "Gary Johnson",
            short_name: "Johnson",
            percentage: johnson,
            image: "public/img/johnson.png",
            imageChin: "public/img/johnson-chin.png"
           }
        ];

        myCache.set( cacheKey, data, function( err, success ) {
          if ( !err && success ) {
            console.log( success );
          }
        } );
      } else {
        data = {
          error: error
        };
      }

      console.log( "data --> ", data );
      res.json( data );
    } );
  } else {
    res.json( cachedResponse );
  }
}

module.exports = PollController;
