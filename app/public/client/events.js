"use strict";
/**
 * Lets use underscores extend method to copy all of the backbone events
 * methods so that we can use it from anywhere
 */
define(["underscore", "backbone"], function(_, Backbone) {
  var obj = {};
  _.extend(obj, Backbone.Events);
  return obj;
});