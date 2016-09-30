"use strict";

( function() {
  angular
    .module( "talkingHeadsApp" )
    .service( "candidateService",
    [ "poll",
      function( poll ) {
        var self = this;

        // Properties

        self.maxHeadSize = 1000;

        // Interface

        self.getCandidates  = getCandidates;
        self.getStyles      = getStyles;

        // Implementation

        function getCandidates() {
          return poll.query();
        }

        function getStyles( candidate ) {
          var headSize = self.maxHeadSize * ( candidate.percentage * .01 );
          // Var backgroundImage = "url(" + candidate.image + ")";

          return {
            height: headSize + "px"
            // BackgroundImage: backgroundImage
          };
        }

    } ] );
} )();
