var app = app || {};

(function( $ ) {
	'use strict';	
	
	app.Router = Backbone.Router.extend({
		routes: {
    		"healthcareFacilities/:healthcareFacilityId/bookings/:bookingId": "bookingDetails",
			"main": "main",
			"logout": "logout",
			"": "login" // Default route
  		},

  		bookingDetails: function(healthcareFacilityId, bookingId) {
			if(!app.Credentials.isAuthenticatedWithRole('ROLE_USER')) {
				return
			}
			var booking = app.Schedule.getBooking(healthcareFacilityId, bookingId);
	      	var bookingDetailsView = new app.BookingDetailsView({ model: booking });
			bookingDetailsView.render();
			$.mobile.changePage("#bookingDetails", {changeHash:false, transition:'slide'});
  		},

  		main: function() {
			if(app.Credentials.isAuthenticatedWithRole('ROLE_USER')) {				
	        	$.mobile.changePage("#bookingList", {changeHash:true, dataUrl: '#bookingList', transition:'slide', reverse: true});
			}
  		},

		login: function() {
			if (!app.MainView) {
				app.MainView = new app.BookingListView();
			}			
			if (!app.Credentials.isAuthenticatedWithRole('ROLE_USER')) {
				app.LoginView = new app.LoginView({model: app.Credentials});
				app.LoginView.render();
			}		
		},

		logout: function() {
			app.Credentials.clear();
			$.mobile.changePage("#login", {changeHash:true, dataUrl:'#login', transition:'flip', reverse: true});
		}
		
	});

}(jQuery));