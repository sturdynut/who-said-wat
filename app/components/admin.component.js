"use strict";

( function() {

  angular
    .module( "talkingHeadsApp" )
    .component( "admin", {
      templateUrl: "components/admin.component.html",
      bindings: {},
      controller: [ "$scope",
      "$log",
      "$resource",
      "$timeout",
      function( $scope, $log, $resource, $timeout ) {
        var vm = $scope;
        var QuoteResource = $resource( "/api/quotes/:id" );

        // Interface

        vm.getQuotes = getQuotes;
        vm.addQuote = addQuote;
        vm.updateQuote = updateQuote;
        vm.removeQuote = removeQuote;

        // Initialization

        function init() {
          vm.getQuotes();
        }

        init();

        // Implementation

        function getQuotes() {
          resetModel();
          QuoteResource.query( function( data ) {
            vm.quotes = data;
          } );
        };

        function addQuote () {
          vm.model.$save( function() {
            vm.getQuotes();
          } );
        };

        function removeQuote ( quote ) {
          quote.$delete( { id: quote._id }, function() {
            vm.getQuotes();
          } );
        };

        function updateQuote ( quote ) {
          quote.$save( { id: quote._id }, function() {
            vm.getQuotes();
          } );
        };

        // Private

        function resetModel() {
          vm.model = new QuoteResource( {
            quote: null,
            short_name: null,
            is_active: true
          } );
        }

    } ]
    } );

} )();
