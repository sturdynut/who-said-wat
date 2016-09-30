"use strict";

( function() {

  var templateHtml = "<div class='admin-page'>" +
    "<h1>Administration</h1>" +
    "<a ui-sref='index'>Go Home</a>" +
    "</div>";

  angular
    .module( "talkingHeadsApp" )
    .component( "admin", {
      template: templateHtml,
      bindings: {},
      controller: [ "$scope",
      "$log",
      "$timeout",
      function( $scope, $log, $timeout ) {
        var vm = $scope;

        // Interface

        // Initialization

        function init() {
        }

        init();

        // Implementation

        // Private
    } ]
    } );

} )();
