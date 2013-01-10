var app = app || {};

$(function() {
	// Create our application's main router to handle # URLs
	app.MainRouter = new app.Router();
	// Start the routing mechanism and load the default route -> ""
	Backbone.history.start();
	// Clear the URL from leftovers and send us to the default route (see app-router.js)
	app.MainRouter.navigate('#', {trigger:true});
});
