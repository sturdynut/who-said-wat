"use strict";

( function() {

  angular
    .module( "talkingHeadsApp" )
    .controller( "pollController",
      [ function(  ) {
        // // Model
        // var Poll = $resource('/api/polls');

        // // Properties
        // $scope.maxHeadSize = 1000;

        // // Interface
        // $scope.getCandidates = getCandidates;
        // $scope.getStyles = getStyles;

        // // Initialization
        // function init() {
        //   $scope.getCandidates();

        //   $timeout(animateCandidates, 5000);
        // }

        // init();

        // // Implementation

        // function animateCandidates() {
        //   $('.candidate').each(function(index) {
        //     animateCandidate(this);
        //   });
        // }

        // function animateCandidate(candidate) {
        //   var h = $(window).height() - 50;
        //   var w = $(window).width() - 50;

        //   var nh = Math.floor(Math.random() * h);
        //   var nw = Math.floor(Math.random() * w);

        //   var newq = [nh, nw];
        //   var oldq = $(candidate).offset();

        //   var speed = calcSpeed([oldq.top, oldq.left], newq);

        //   $(candidate).animate({ top: newq[0], left: newq[1] }, speed, function(){
        //     animateCandidate(candidate);
        //   });
        // }

        // // Thank you http://jsfiddle.net/Xw29r/15/
        // function calcSpeed(prev, next) {

        //   var x = Math.abs(prev[1] - next[1]);
        //   var y = Math.abs(prev[0] - next[0]);

        //   var greatest = x > y ? x : y;

        //   var speedModifier = 0.1;

        //   var speed = Math.ceil(greatest/speedModifier);

        //   return speed;

        // }

        // function getCandidates() {
        //   Poll.query(function (response) {
        //     $scope.candidates = response;
        //   });
        // };

        // function getStyles(candidate) {
        //   var headSize = $scope.maxHeadSize * (candidate.percentage * .01);

        //   return {
        //     height: headSize + 'px'
        //   };
        // }

    } ] );
} )();
