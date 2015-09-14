"use strict";
define([
  'jquery',
  'underscore', 
  'backbone',
  '../collections/issueCollection',
  './IssueCollectionView',
  'select2',
  '../events'
  ], function($, _, Backbone, IssueCollection, IssueCollectionView, Select2, Events){
  return Backbone.View.extend({ 
	  
	  el: '#issuesDiv',
	  /**
	   * Called when our view is instantiated. 
	   * We will pass the collection to the collection View
	   * We will bind to the collection.reset method so that 
	   * when our collection is reset we will render our new collection results 
	   */
	  initialize: function() {
		    this.issueCollectionView = new IssueCollectionView({collection: this.collection});
		    this.collection.bind("reset", _.bind(this.renderIssueList, this));
	  },
	  
	  events: {
	      "click #search": "queryApi",
	      //"focusout #userNameInput": "selecting", (Used for task 4 but never completed)
	      //"change #repoNameInput": "queryApi", (Used for task 4 but never completed)
	      "click .issueModel": "getIssueDetails"
	  }, 
	    
	  queryApi: function(e){
		  e.preventDefault();
		  var self = this;
		  var userName = $('#userNameInput').val();
		  var repoName = $('#repoNameInput').val();
		  var numItems = $('#numItemsInput').val();
		  /** User input validation. 
		   * If there is a username and repoNaame present
		   * set the github api that we will query
		   * and fetch the collection**/
		  if(repoName && userName){
			  self.collection.setUrl(userName, repoName, numItems);
			  this.issueCollectionView.fetchCollection();
		  }else if(repoName && !userName){
			  $("#issueListView").remove();
			  $(".error").remove();
			  self.$el.append('<div class="error text-center">Enter a Username!!!!!</div>');
		  }else if(!repoName && userName){
			  $("#issueListView").remove();
			  $(".error").remove();
			  self.$el.append('<div class="error text-center">Enter a repo Name !!!!</div>');
		  }else{
			  $("#issueListView").remove();
			  $(".error").remove();
			  self.$el.append('<div class="error text-center">I cannot read your mind, enter some data!</div>');
		  }
	  },
	  /** Used for task four but never completed.**/
	 /** selecting: function(){
		  "use strict";
		  var userName = $('#userNameInput').val();
		  if(userName){
			  console.log(userName);
		  var repoNames = [];
		  var jqxhr = $.getJSON( "https://api.github.com/users/" + userName + "/repos", function() {
			 
			}).done(function( data ){
				
				$(data).each(function(index) {
				    repoNames.push(data[index].name);
				    $(".repo-results").select2({
				    	  data: repoNames
				    	});
				});
				pagination: {
					more: (repoNames.length * 30) < 86;
					}
			});
		  }
	  },**/
	  
	  /**We have our collection lets pass it to the issue collection view
	  and create our elements. 
	  (This method is used when the collection is reset to render the new issueCollectionView)**/
	  renderIssueList: function(){
		  var self = this;
		  self.$el.append(this.issueCollectionView.render().el);
	  },
	  
	  /**
	   * Used by the router to append 
	   * this view to the .app div
	   */
	  render: function(){
		return this;  
	  },
	  /** Method used to display a single issue view**/
	  getIssueDetails: function(e){
		  e.preventDefault();
		  var id = $(e.currentTarget).data("id");
		  var url = "issue/" + id;
		  Events.trigger("router:navigate", url);	  
	  }
  });
});
  