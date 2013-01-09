var app = app || {};

(function( $ ) {
	'use strict';

	app.BookingListView = Backbone.View.extend({
		
		// The element of the booking list view has id bookingList
		el: '#bookingList',
		
		template: _.template( $('#booking_list_entry_template').html() ),
		
		
		events: {
			
			'click #fetch': 'fetchSchedule',        // ACTIVATE ME!!!!!
			
			// for mobile devices you could use the tap event instead of click
		},
		
		initialize: function() {
		},
		
		fetchSchedule: function() {
			alert("All your base are belong to us!");
		},
		
		render: function() {
			// Remove old list entries, but not the list header, i.e. only the buttons
			this.$el.find('#bookingListContent li.ui-btn').remove();
			// Send each of the bookings in the Schedule collection to the addBooking function
			app.Schedule.each(this.addBooking, this);
			// Make jQuery Mobile refresh the list view
			this.$el.find('#bookingListContent').listview('refresh');
			return this;
		},

		addBooking: function( booking ) {
			var view = new app.BookingListEntryView({ model: booking });
			view.render();
			this.$el.find('#bookingListContent').append( view.el );
		},
			
	});
	
})(jQuery);