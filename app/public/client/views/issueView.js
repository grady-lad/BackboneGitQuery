"use strict";
define([
  'jquery', 
  'backbone',
  'handlebars',
  '../events'
  ], function($, Backbone, Handlebars, Events){
  return Backbone.View.extend({
	  /** Our Handlebars template that we will be compiling our model to**/
	  template: Handlebars.compile($('#issueTemplate').html()),
	  
	  el: '#singleIssueDiv',
	  
	  events: {
	      "click .back": "returnToList"
	  },
	  
	  render: function(){
			/** Pass the model as a json object
			 *  to our handlebars template so that
			 *  we can loop through and display the attributes**/
	        this.$el.html(this.template({Issue: this.model.toJSON()}));
			return this;
	  },
	  
	  /** Method used to trigger the router to navigate
	   *  to the "/" root (see Events.on within the router)**/
	  returnToList: function(e){
		  e.preventDefault();
		  var url = "";
		  Events.trigger("router:navigate", "");
	  }
		
  });
});
  
  