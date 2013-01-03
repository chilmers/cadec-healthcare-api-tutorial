var app = app || {};
$(document).bind("mobileinit", function () {
	// Turn off JQuery Mobile's link handling since we want to use Backbone for rendering
    $.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;

	// Make care of removing pages since we disabled JQuery Mobile's default behaviour
//	$('div[data-role="page"]').live('pagehide', function (event, ui) {
	   // $(event.currentTarget).remove();
//	});
	
app.MainView = new app.BookingListView();
app.MainView.render();

});