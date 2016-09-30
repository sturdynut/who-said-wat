"use strict";

( function() {
  angular
    .module( "talkingHeadsApp" )
    .factory( "poll",
    [ "$resource",
      function( $resource ) {

        return $resource( "/api/polls" );

    } ] );
} )();
