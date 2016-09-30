"use strict";

( function() {
  angular
    .module( "talkingHeadsApp" )
    .controller( "candidatesController",
      [ "$scope",
      "$timeout",
      "candidateService",
      function( $scope, $timeout, candidateService ) {
        var self = $scope;

        // Interface
        self.getStyles = candidateService.getStyles;

        // Initialization

        function init() {
          candidateService.getCandidates()
            .then( function( data ) {
              self.candidates = data;
              $timeout( animateCandidates );
            } );
        }

        init();

        // Implementation

        function animateCandidates() {
          $( ".candidate" ).each( function( index ) {
            animateCandidate( this );
          } );
        }

        // Private

        function animateCandidate( candidate ) {
          var h = $( window ).height() - 50;
          var w = $( window ).width() - 50;

          var nh = Math.floor( Math.random() * h );
          var nw = Math.floor( Math.random() * w );

          var newq = [ nh, nw ];
          var oldq = $( candidate ).offset();

          var speed = calcSpeed( [ oldq.top, oldq.left ], newq );

          $( candidate ).animate( { top: newq[ 0 ], left: newq[ 1 ] }, speed, function() {
            animateCandidate( candidate );
          } );
        }

        // Thank you http://jsfiddle.net/Xw29r/15/
        function calcSpeed( prev, next ) {

          var x = Math.abs( prev[ 1 ] - next[ 1 ] );
          var y = Math.abs( prev[ 0 ] - next[ 0 ] );

          var greatest = x > y ? x : y;

          var speedModifier = 0.1;

          var speed = Math.ceil( greatest / speedModifier );

          return speed;

        }
    } ] );
} )();
