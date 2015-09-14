"use strict";
define([
  'jquery',
  'backbone',
  'handlebars'
  ], function($, Backbone, Handlebars){
  return Backbone.View.extend({
	  
	  template: Handlebars.compile($('#issueListTemplate').html()),
	  
	  el: '#issueListView',
	  
	  /** Sort the collection before applying the collection as a JSON object to
	   *  our template **/
	  render: function(){
		  	
			//this.collection.sortByField("number");
	        this.$el.html(this.template({Issues:this.collection.toJSON()}));
			return this;
		},
		/** Get the pagination links from the response header
		 *   and return the result as a key pair object**/
		getPaginLinks: function (links){
			/**check if any pagination links exist**/
			if(links){
				/**create an object containing each link and their name**/
				links = links.toLowerCase();
				var words = links.split(' ');
				/**regEx to match against <EXAMPLE HERE>**/
				var regEx = /rel="([^"]*)"/g;
				/**returning key**/
				var name = "hey";
				/**returning value**/
				var url;
				/**returning object containing {name: url}**/
				var result = {};
				console.log(result);
				var i;
				for(i=1; i < words.length; i++){
					/**Check if matches our predefined expression E.G: rel="next**/
					if(words[i].match(regEx)){
						/**Lets replace the word with our regEx match**/
						url = words[i -1].replace(/<(.*)>;/, '$1').trim();
					    name = words[i].replace(regEx, '$1').trim();
					    /**removing annyoing "," from the key
					     * We could create another regex but this seemed quick
					     * not sure which would of been better approach **/
					    if(name.charAt(name.length - 1) === ","){
					    	name = name.substring(0, name.length -1);
					    }
					    /** Creating result with link description as the key
					     * 	and url as value eg. {next: http:urlvalue}**/
				      	result[name] = url;
					}
				}
				return result;
			}
		},
		/** Create a div that will contain pagination Links**/
		createPaginLinks: function(result){
			
			var self = this;
			var pageDiv = $('<div class="paginationDiv"></div>');
			var key;
			var a;
			/** Loop through our result and create links for
			 *  each pagination provided in our result array**/
			for (key in result) {
				/** Once the for loop has completed the key will always
				 *  be the key at the last iteration, hence why we need this extra function
				 *  to capture the key at each iteration**/
				(function(x){	
					a = $('<a>',{
						text: x,
						href: '#',
						class: key +'Link',
						click: function(e) {
								e.preventDefault();
								/** Fetch the collection with the pagin url
								 * asscoicated with this link**/
								self.fetchCollection(result[x]);
						}
					});
					/** So that our pagination that displays the 1st pagin link
					*  always appears first in our div**/
					if(x === "first"){
						pageDiv.prepend(a);
					}else{
						pageDiv.append(a);
					}
				})(key);
			 }
			/** Append it to our view**/
			this.$el.append(pageDiv);
		},
		
		/** @Param: PaginLink is a optional param
		 * 	 this will only be passed if we click the pagination links**/
		fetchCollection: function(paginLink){
			var self = this;
			var links;
			
			$('.error').remove();
			/**loading div**/
			self.$el.append('<div class="loading"></div>');
			/**hide previous collection if any**/
			$('.issueTable').hide();
			$('.paginationDiv').hide();
			
			/**Set the collections url to the pagination url
			 * if we passed the pagination url to this method
			 * thus: the pagination url was clicked**/
			if(paginLink){
				self.collection.setPaginUrl(paginLink);
			}
			/** **/
			this.collection.fetch({reset: true, success: function (collection, response, options) {
					/** Remove our loading div and show our results**/
					$('.loading').remove();
					$('.issueTable').show();
					$('.paginationDiv').show();
					
					/** Get the pagination links from the header and create the links**/
					links = self.getPaginLinks(options.xhr.getResponseHeader('Link'));
					self.createPaginLinks(links);
				}  
			 }).fail(function() {
				 /** If there is an error querying the api display the error**/
				 $('.loading').remove();
				 self.$el.append('<div class="error text-center">ERROR: Seems like the username or repo might not exist</div>');
			 });
		}
  });
});
  
  