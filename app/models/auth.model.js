"use strict";

( function() {
  angular
    .module( "talkingHeadsApp" )
    .factory( "auth",
    [ "$resource",
      function( $resource ) {

        return $resource( "/api/auth/:guid" );

    } ] );
} )();
