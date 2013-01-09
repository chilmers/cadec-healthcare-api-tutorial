var app = app || {};

(function( $ ) {
	'use strict';

	app.BookingListView = Backbone.View.extend({
		
		// The element of the booking list view has id bookingList
		el: '#bookingList',
		
		template: _.template( $('#booking_list_entry_template').html() ),
		
		events: {
			'click #fetch': 'fetchSchedule',
			//'tap a#fetch': 'fetchSchedule' // the tap event can be used on mobile devices
		},
		
		initialize: function() {
		},
		
		fetchSchedule: function() {
			$.mobile.loading( 'show', {
				text: 'Loading bookings',
				textVisible: true,
			});
			app.Schedule.reset();
			app.Schedule.fetch({
				beforeSend: function (xhr) {
					xhr.setRequestHeader ("Authorization", "Basic " + app.Credentials.get('basicAuth')); 
				}
			})
			.done(
				// Use jQuery proxy to make sure that the event callback function gets correct "this" context
				$.proxy(function() {
					// on success we want to render the bookings list
					this.render();
					// and update the text on the fetch button to "Update bookings"
					$("a#fetch .ui-btn-text").html("Update bookings");
				}, this)
			)
		    .fail(function() { 
				alert("fetch error");
			})
			.always( function() {
				$.mobile.loading('hide');
			});
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