var app = app || {};

(function( $ ) {
	
	app.Router = Backbone.Router.extend({
		routes: {
    		"healthcareFacilities/:healthcareFacilityId/bookings/:bookingId": "bookingDetails",
			"main": "main"
  		},

  		bookingDetails: function(healthcareFacilityId, bookingId) {
			var booking = app.Schedule.getBooking(healthcareFacilityId, bookingId);
	      	var bookingDetailsView = new app.BookingDetailsView({ model: booking });
			bookingDetailsView.render();
	        $.mobile.changePage(bookingDetailsView.$el, {changeHash:true, transition:'slide', reloadPage: true});
			bookingDetailsView.$el.trigger('create');
  		},

  		main: function() {
			// Kick things off by rendering the first page of the app
			//var bookingListView = new app.BookingListView();
			//app.MainView.render();	
	        $.mobile.changePage(app.MainView.$el, {changeHash:false, transition:'slide', reverse: true});
  		}
		
	});
	
	app.Router = new app.Router();
	Backbone.history.start();

}(jQuery));