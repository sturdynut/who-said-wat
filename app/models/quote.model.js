"use strict";

( function() {
  angular
    .module( "talkingHeadsApp" )
    .factory( "quote",
    [ "$resource",
      function( $resource ) {

        return $resource( "/api/quotes" );

    } ] );
} )();
