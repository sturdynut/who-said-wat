"use strict";

( function() {
  angular
    .module( "talkingHeadsApp" )
    .controller( "candidatesController",
      [ "$scope",
      "$log",
      "$timeout",
      "candidateService",
      function( $scope, $log, $timeout, candidateService ) {
        var vm = $scope;

        // Interface

        vm.candidates = null;
        vm.quoteIndex = 0;
        vm.guess = guess;
        vm.reset = reset;
        vm.prev = prev;
        vm.next = next;

        Object.defineProperty( vm, "currentQuote", {
          get: function() {
            return vm.quotes[ vm.quoteIndex ];
          }
        } );

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

          candidateService.getQuotes().$promise
            .then( function( data ) {
              vm.quotes = data;
            } )
            .catch( function( err ) {
              $log.error( "Error", err );
            } );
        }

        init();

        // Implementation

        function guess( candidate ) {
          if ( isWinner( candidate ) ) {
            setWinner( candidate );
          } else {
            setLoser( candidate );
          }
        }

        function reset() {
          setWinner( null );
          resetAllLosers();
        }

        function next() {
          if ( vm.quotes ) {
            if ( vm.quoteIndex >= 0 && vm.quoteIndex < vm.quotes.length - 1 ) {
              vm.quoteIndex++;
            } else if ( vm.quoteIndex === vm.quotes.length - 1 ) {
              vm.quoteIndex = 0;
            }

            reset();
          }
        }

        function prev() {
          if ( vm.quotes ) {
            if ( vm.quoteIndex > 0 ) {
              vm.quoteIndex--;
            } else if ( vm.quoteIndex === 0 ) {
              vm.quoteIndex = vm.quotes.length - 1;
            }

            reset();
          }
        }

        // Private

        function isWinner( candidate ) {
          return vm.currentQuote && vm.currentQuote.short_name === candidate.short_name;
        }

        function setWinner( winner ) {
          vm.candidates = _.map( vm.candidates, function( candidate ) {
            var isWinner = winner ? candidate.short_name === winner.short_name : false;

            return _.assign( {}, candidate, {
              isWinner: isWinner
            } );
          } );
        }

        function setLoser( loser ) {
          vm.candidates = _.map( vm.candidates, function( candidate ) {
            var isLoser = candidate.isLoser;
            if ( _.isUndefined( isLoser ) || isLoser !== true ) {
              isLoser = loser ? candidate.short_name === loser.short_name : false;
            }

            return _.assign( {}, candidate, {
              isLoser: isLoser
            } );
          } );
        }

        function resetAllLosers( ) {
          vm.candidates = _.map( vm.candidates, function( candidate ) {
            return _.assign( {}, candidate, {
              isLoser: false
            } );
          } );
        }
    } ] );
} )();
