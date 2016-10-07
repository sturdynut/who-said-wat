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
      "auth",
      function( $scope, $log, $resource, $timeout, auth ) {
        var vm = $scope;
        var QuoteResource = $resource( "/api/quotes/:id" );

        // Properties

        vm.guid = null;

        // Interface

        vm.getQuotes = getQuotes;
        vm.addQuote = addQuote;
        vm.updateQuote = updateQuote;
        vm.removeQuote = removeQuote;
        vm.login = login;

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

        function login( guid ) {
          if ( guid && guid.length === 32 ) {
            auth.get( {
              guid: guid
            } ).$promise
            .then( function() {
              vm.isAuthenticated = true;
            } )
            .catch( function( e ) {
              $log.error( "Error", e );
            } );
          }
        }

        // Private

        function resetModel() {
          vm.model = new QuoteResource( {
            quote: null,
            source: null,
            short_name: null,
            is_active: true
          } );
        }

    } ]
    } );

} )();
