var app = app || {};

(function( $ ) {


	// Schedule Collection
	// ---------------

	// The collection of bookings is backed by *localStorage* instead of a remote
	// server.
	BookingList = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: app.Booking,
		
		//localStorage: new Store("healthcare-app-booking-store"),
		
		url: 'http://localhost:8080/api/bookings',
		
		// Save all of the todo items under the `"todos"` namespace.
		//localStorage: new Store('todos-backbone'),
	
	  	parse: function(response) {
	    	return response;
	  	},
	
		// We keep the bookings in sequential order, despite being saved by unordered
		// GUID in the database. This generates the next order number for new items.
		nextOrder: function() {
			if ( !this.length ) {
				return 1;
			}
			return this.last().get('order') + 1;
		},

		// Bookings are sorted by their original insertion order.
		comparator: function( todo ) {
			return todo.get('order');
		},
		
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

	// Create our global collection of **Bookings** i.e. Schedule
	app.Schedule = new BookingList();
		    	        
})(jQuery);