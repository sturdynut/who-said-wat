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
        vm.resetEntireGame = resetEntireGame;
        vm.prev = prev;
        vm.next = next;
        vm.guessed = false;
        vm.accumlatedPoints = 0;

        Object.defineProperty( vm, "currentQuote", {
          get: function() {
            return vm.quotes[ vm.quoteIndex ];
          }
        } );

        // Initialization

        function init() {
          vm.ready = false;

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
              $timeout( function() {
                vm.ready = true;
              }, 1500 );
            } )
            .catch( function( err ) {
              $log.error( "Error", err );
            } );
        }

        init();

        // Implementation

        function guess( candidate ) {
          if ( isWinner( candidate ) ) {
            if ( vm.guessed !== true ) {
              vm.guessed = true;
              if ( vm.accumlatedPoints < vm.candidates.length ) {
                vm.accumlatedPoints++;
              }
            }
            setWinner( candidate );
          } else {
            setLoser( candidate );
          }

          if ( isAtEnd() ) {
            $timeout( function() {
              var msg = "Congratulations!";
              if ( vm.accumlatedPoints === 0 ) {
                msg = "Ouch!";
              }
              if ( vm.accumlatedPoints === 1 ) {
                msg = "Better luck next time!";
              }
              if ( vm.accumlatedPoints === vm.quotes.length ) {
                msg = "You have been paying attention!!";
              }
              vm.successMessage = msg + " You got " + vm.accumlatedPoints + " out of " + vm.quotes.length + "!";
            }, 1000 );
          } else {
            $timeout( next, 1000 );
          }
        }

        function reset() {
          setWinner( null );
          resetAllLosers();
        }

        function resetEntireGame() {
          reset();
          vm.quoteIndex = 0;
          vm.guessed = false;
          vm.accumlatedPoints = 0;
          vm.successMessage = null;
        }

        function next() {
          vm.guessed = false;

          if ( vm.quotes ) {
            if ( vm.quoteIndex >= 0 && vm.quoteIndex < vm.quotes.length - 1 ) {
              vm.quoteIndex++;
            } else if ( isAtEnd() ) {
              vm.quoteIndex = 0;
              vm.accumlatedPoints = 0;
            }

            reset();
          }
        }

        function prev() {
          vm.guessed = false;

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

        function isAtEnd() {
          return vm.quoteIndex === vm.quotes.length - 1;
        }

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
