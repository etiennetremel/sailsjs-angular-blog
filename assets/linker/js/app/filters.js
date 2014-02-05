'use strict';


//
// Filters
// ---------------------------

angular.module('blogApp.filters', [])
  .filter('timeago', function () {
    return function(date){
      return moment(date).fromNow();
    };
  });