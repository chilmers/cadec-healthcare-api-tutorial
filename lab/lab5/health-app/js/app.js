var app = app || {};

$(function() {
	app.MainView = new app.BookingListView();
	if (!app.Credentials.isLoggedIn) {
		app.LoginView = new app.LoginView({model: app.Credentials});
		app.LoginView.render();
	} else {
	    $.mobile.changePage("#bookingList", {changeHash:true, dataUrl: '#bookingList', transition:'flip'});
	}
});
