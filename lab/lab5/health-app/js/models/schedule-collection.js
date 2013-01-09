var app = app || {};

(function( $ ) {

	var BookingList = Backbone.Collection.extend({
		
		model: app.Booking,
				
		url: 'http://localhost:8080/api/bookings',

		getBooking: function(healthcareFacilityId, bookingId) {
			var matchingBookingArray = this.where(
				{healthcareFacility: healthcareFacilityId,
				 bookingId: bookingId
				});
			if (matchingBookingArray.length > 0) {
				return matchingBookingArray[0];
			} else {
				return null;
			}	
		}
				
	});

	// Create our global collection Booking list, app.Schedule
	app.Schedule = new BookingList();
		    	        
})(jQuery);