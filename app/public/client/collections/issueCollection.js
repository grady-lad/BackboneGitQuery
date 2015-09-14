"use strict";
define(['backbone', '../models/issueModel'], function(Backbone, IssueModel) {
  return Backbone.Collection.extend({
    
	model: IssueModel,
    /** Because we don't know what we will be querying, better leave this blank**/
	url: '',
	/** key used to sort our collection**/
    sort_key: 'number',
    
    /**Set the url when the user has entered values into the input form**/
    setUrl: function(userName, repoName, numItems){
    	if(!numItems){
        	this.url = 'https://api.github.com/repos/' + userName + '/' + repoName + '/issues';
        /** The url to query the user has specified the amount of results per page **/
    	}else{
    		this.url = 'https://api.github.com/repos/' + userName + '/' + repoName + '/issues?per_page='+ numItems;
    	}
    },
    /**Set the url to the pagination url if the pagination links are clicked**/
    setPaginUrl: function(paginUrl){
    	this.url = paginUrl;
    },
    /** If we want to sort our collection we need this comparator function**/
    comparator: function(a) {
	        return a.get(this.sort_key);
	},
	/** This is the method we will call to sort our models by number **/
	sortByField: function(fieldName) {
		this.sort_key = fieldName;
	    this.sort();
	}
  });
});