var app = app || {};
$(document).bind("mobileinit", function () {
	// Turn off JQuery Mobile's link handling since we want to use Backbone for rendering
	// See: http://jquerymobile.com/test/docs/pages/backbone-require.html
//    $.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
});