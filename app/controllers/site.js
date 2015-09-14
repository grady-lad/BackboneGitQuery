"use strict";

exports.home = function (req, res) {
  res.render("site/home", {title: 'Home'});
};

exports.singleIssue = function (req, res) {
	  res.render("site/singleIssue", {title: 'Issue'});
};