"use strict";
var express = require("express");
var path    = require("path");

module.exports = function (app) {
	
	//======================
	// View Configuration
	//=======================
	app.set("views", __dirname + "/../app/views");
	app.set("view engine", "jade");
	app.use("/", express.static(path.join(__dirname , '/../app/public/')));
	/** I should not have to do this, need to fix later**/
	app.use("/issue", express.static(path.join(__dirname , '/../app/public/')));
};