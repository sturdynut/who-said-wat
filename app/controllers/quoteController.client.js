"use strict";

( function() {
  angular
    .module( "talkingHeadsApp" )
    .controller( "quoteController",
      [ "$scope",
      "$resource",
      "quote",
      function( $scope, $resource, quote ) {
        var vm = $scope;

        vm.getQuotes = getQuotes;
        vm.resetQuotes = resetQuotes;
        vm.addQuote = addQuote;

        function init() {
          vm.getQuotes();
          vm.model = quote;
        }

        init();

        function getQuotes() {
          quote.query( function( results ) {
            vm.quotes = results[ 0 ].quotes;
          } );
        };

        function addQuote () {
          quote.save( function() {
            vm.getQuotes();
          } );
        };

        function resetQuotes() {
          quote.remove( function() {
            vm.getQuotes();
          } );
        };

    } ] );
} )();
