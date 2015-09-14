define(["backbone", "./router"], function(Backbone, Router) {
  var App = {};
  /** Lets start our Backbone App by initiating
   *  the router and tracking the history to allow us to go back**/
  App.start = function() {
    new Router();
    Backbone.history.start({pushState: true, root: "/"});
  };
  return App;
});