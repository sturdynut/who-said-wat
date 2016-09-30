"use strict";

( function() {

  // Var templateHtml = "<ul class='candidates'>" +
  //   "<li class='candidate' data-ng-style='getStyles(candidate)' data-ng-repeat='candidate in candidates'></li>" +
  // "</ul>";

  var templateHtml = "<ul class='candidates'>" +
  "<li class='candidate' data-ng-repeat='candidate in candidates'>" +
    "<img" +
      " data-ng-src='{{ candidate.image }}'" +
      " data-ng-title='{{ candidate.name }}'" +
      " data-ng-style='getStyles(candidate)' />" +
    "<div class='candidate__quote' data-ng-show='hasQuotes(candidate)'>{{ getFirstQuote(candidate) }}</div>" +
    "<div class='candidate__percentage'>{{ candidate.percentage }}</div>" +
  "</li>" +
"</ul>";

  angular
    .module( "talkingHeadsApp" )
    .component( "candidates", {
      template: templateHtml,
      bindings: {},
      controller: [ "$scope",
      "$log",
      "$timeout",
      "candidateService",
      function( $scope, $log, $timeout, candidateService ) {
        var vm = $scope;

        // Interface

        vm.candidates = null;
        vm.getStyles = candidateService.getStyles;
        vm.getFirstQuote = getFirstQuote;
        vm.hasQuotes = hasQuotes;

        // Initialization

        function init() {
          candidateService.getCandidates().$promise
            .then( function( data ) {
              vm.candidates = data;
              // $timeout( animateCandidates );
            } )
            .catch( function( err ) {
              $log.error( "Error", err );
            } );
        }

        init();

        // Implementation

        function hasQuotes( candidate ) {
          return candidate && candidate.quotes && candidate.quotes.length > 0;
        }

        function getFirstQuote( candidate ) {
          if ( hasQuotes( candidate ) ) {
            return candidate.quotes[ 0 ].quote;
          }

          return null;
        }

        // Private

        function animateCandidates() {
          $( ".candidate" ).each( function( index ) {
            animateCandidate( this );
          } );
        }

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
    } ]
    } );

} )();
