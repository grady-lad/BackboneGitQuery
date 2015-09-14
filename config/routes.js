"use strict";
var site = require('../app/controllers/site');


module.exports = function (app) {
	
  //========================
  // Site Front end Routes
  // =======================
  app.get("/" , site.home);
  app.get("/issue/:id", site.singleIssue);
  

};