"use strict";

( function() {
  var app = angular
    .module( "talkingHeadsApp", [ "ngResource", "ui.router" ] );

  app.config( function( $stateProvider, $urlRouterProvider, $locationProvider ) {
    $locationProvider.html5Mode( true );

    var indexState = {
      name: "index",
      url: "/",
      template: "<candidates></candidates>"
    };

    var adminState = {
      name: "admin",
      url: "/admin",
      template: "<admin></admin>"
    };

    $stateProvider.state( indexState );
    $stateProvider.state( adminState );

    $urlRouterProvider.otherwise( "/" );
  } );
} )();
