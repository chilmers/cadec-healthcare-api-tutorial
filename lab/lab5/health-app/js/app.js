var app = app || {};

var ENTER_KEY = 13;

$(document).on('pageinit', function() {

	// Turn off JQuery Mobile's link handling since we want to use Backbone for rendering
    $.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
});

$(document).on('ready', function() {
	app.MainView = new app.BookingListView();
	app.MainView.render();
});
