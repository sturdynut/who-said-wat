"use strict";

var ObjectId = require( "mongodb" ).ObjectId;

function quoteHandler ( db ) {
  var quotesDB = db.collection( "quotes" );

  this.getQuotes = function( req, res ) {
    quotesDB.find().toArray( function( err, data ) {
      if ( err ) {
        console.log( "******** ////// ERROR /////// *******", err );
        return res.json( [] );
      } else {
        res.json( data );
      }
    } );
  };

  this.addQuote = function( req, res ) {

    if ( req.body ) {
      quotesDB.insertOne( req.body, function( err, result ) {
        if ( !err ) {
          console.log( "******** ////// ADDED! /////// *******" );
          res.json( { success: true } );
        } else {
          console.log( "******** ////// ADD ERROR! /////// *******", err );
          res.json( { error: err } );
        }
      } );
    } else {
      res.json( {
        error: "No data sent."
      } );
    }

  };

  this.updateQuote = function( req, res ) {

    if ( req.body ) {
      var updatedObject = req.body;
      delete( updatedObject._id );

      quotesDB.updateOne( { "_id": ObjectId( req.params.id ) }, updatedObject, function( err, result ) {
        if ( !err ) {
          console.log( "******** ////// UPDATED! /////// *******" );
          res.json( { success: true } );
        } else {
          console.log( "******** ////// UPDATE ERROR! /////// *******", err );
          res.json( { error: err } );
        }
      } );
    } else {
      res.json( {
        error: "No data sent."
      } );
    }

  };

  this.removeQuote = function( req, res ) {
    quotesDB.deleteOne( { "_id": ObjectId( req.params.id ) }, function( err, result ) {
      if ( !err ) {
        console.log( "******** ////// DELETED! /////// *******" );
        res.json( { success: true } );
      } else {
        console.log( "******** ////// ERROR! /////// *******", err );
        res.json( { error: err } );
      }
    } );

  };

}

module.exports = quoteHandler;
