(function(module) {
	"use strict";

	var db = module.parent.require('../src/database'),
		conf = module.parent.require('./meta').config;

	var constants = Object.freeze({
		'name': "API",
		'admin': {
			'route': '/plugins/api',
			'icon': 'fa-edit'
		}
	});

	var API = {};

	API.init = function(app, middleware, controllers, callback) {
		
		
		function render(req, res, next) {
			res.render('admin/plugins/sso-saml', {});
		}

		app.get('/admin/plugins/api', middleware.admin.buildHeader, render);
		app.get('/api/admin/plugins/api', render);
		
		if (conf["api:baseURL"] && conf["api:secret"] && conf["api:authTimestampLiveTime"]){
			
			console.log("Running API at "+ conf["api:baseURL"]);

			app.get(conf["api:baseURL"],function(req, res, next){
		        res.send("API running");
		    });

			var Categories = require("./categories.js");
			Categories.init(app);	
		}
		else{
			console.error("No config values specified, please complete config info at /admin/plugins/api");
		}
	
		callback();
	};

	API.addMenuItem = function(custom_header, callback) {
		custom_header.plugins.push({
			"route": constants.admin.route,
			"icon": constants.admin.icon,
			"name": constants.name
		});

		callback(null, custom_header);
	};

	module.exports = API;
}(module));
