"use strict";

( function() {
  angular
    .module( "talkingHeadsApp" )
    .service( "candidateService",
    [ "poll", "quote",
      function( poll, quote ) {
        var self = this;

        // Properties

        // Interface

        self.getCandidates  = getCandidates;
        self.getQuotes      = getQuotes;

        // Implementation

        function getCandidates() {
          return poll.query();
        }

        function getQuotes() {
          return quote.query();
        }

    } ] );
} )();
