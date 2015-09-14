"use strict";
define(["backbone", "./views/initialView", "./views/issueView", "./collections/issueCollection", "./events"], function(Backbone, InitialView, IssueView, IssueCollection, Events) {
	var Router = Backbone.Router.extend({
		
		initialize: function() {
			
			var self = this;
			
			/** Instantiate our collection and initial view**/
			this.collection = new IssueCollection();
			this.initialView = new InitialView({collection: this.collection});
			
			/**Used to navigate to url changes
			 * @param url: The url we will navigate to**/
			Events.on("router:navigate", function(url) {
				self.navigate(url, { trigger: true });
		    });
	    },
	    
	    routes: {
	    	"": "index",
	    	"issue/:id": "issue"
	    },
	    
	    /**Our home.jade file contains an .app div
	     * Lets append all our views to this div when we
	     * need them.*/
	    _renderView: function(view) {
	        $(".app").append(view.render().el);
	      },
	    
	    /**Render the initial View when hitting the "/" route*/
	    index: function(){
	    	this._renderView(this.initialView);
	    	/**Hide the single issue view if present */
	    	$("#singleIssueDiv").hide();
	    	$("#issuesDiv").show();
	    },
	    
	    /**Method used when hitting "/issue/:id"
	     * @param id = the models id that we get from the url **/
	    issue: function(id){
	    	$("#issuesDiv").hide();
	    	$("#singleIssueDiv").show();
	    	var issueView = new IssueView({model: this.collection.get(id)});
	    	this._renderView(issueView);
	    	/**Looping through the p tags within singleIssueDiv
	    	 * and fading them in one by one **/
	    	$(document).scrollTop(0);
	    	$('#singleIssueDiv p').each(function(i) {
	    		$(this).delay((i++) * 500).fadeTo(1000, 1);
	    	});
	    }
	});
	return Router;
});