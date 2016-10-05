"use strict";

( function() {

  angular
    .module( "talkingHeadsApp" )
    .component( "candidates", {
      templateUrl: "components/candidates.component.html",
      bindings: {},
      controller: "candidatesController"
    } );

} )();
