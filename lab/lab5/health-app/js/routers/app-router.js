var app = app || {};

(function( $ ) {
	
	app.Router = Backbone.Router.extend({
		routes: {
    		"healthcareFacilities/:healthcareFacilityId/bookings/:bookingId": "bookingDetails",
			"main": "main",
			"logout": "logout"
  		},

  		bookingDetails: function(healthcareFacilityId, bookingId) {
			if(!app.MainView) {
				return
			}
			var booking = app.Schedule.getBooking(healthcareFacilityId, bookingId);
	      	var bookingDetailsView = new app.BookingDetailsView({ model: booking });
			bookingDetailsView.render();
			$.mobile.changePage("#bookingDetails", {changeHash:false, transition:'slide'});
  		},

  		main: function() {
			if(app.MainView) {
	        	$.mobile.changePage("#bookingList", {changeHash:true, dataUrl: '#bookingList', transition:'slide', reverse: true});
			}
  		},

		logout: function() {
			app.Credentials.clear();
			$.mobile.changePage("#login", {changeHash:true, dataUrl:'#login', transition:'flip', reverse: true});
		}
		
	});
	
	app.Router = new app.Router();
	Backbone.history.start({ silent : true });

}(jQuery));