"use strict";

( function() {

  angular
    .module( "talkingHeadsApp" )
    .directive( "keypress", function() {
      return function( scope, element, attrs ) {
        var onEnter = attrs.onEnter;
        var onLeftArrow = attrs.onLeftArrow;
        var onRightArrow = attrs.onRightArrow;

        angular.element( document ).find( "body" ).bind( "keyup", function( event ) {
            if ( event.which === 13 ) {
              scope.$apply( function() {
                scope.$eval( onEnter );
              } );

              event.preventDefault();
            }

            if ( event.keyCode === 37 ) {
              scope.$apply( function() {
                scope.$eval( onLeftArrow );
              } );
            }

            if ( event.keyCode === 39 ) {
              scope.$apply( function() {
                scope.$eval( onRightArrow );
              } );
            }
        } );
    };
  } );

} )();
