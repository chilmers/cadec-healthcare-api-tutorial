var app = app || {};

(function( $ ) {
	'use strict';
	
	app.BookingListEntryView = Backbone.View.extend({
		
		tagName:  'li',

		template: _.template( $('#booking_list_entry_template').html() ),
		
		attributes: {
			 'data-theme': 'c'
		},
		
		events: {
		},
		
		initialize: function() {
		},
		
		// Render the booking
		render: function() {
			var renderedTemplate = this.template( this.model.toJSON() );
			this.$el.html( renderedTemplate );
			return this;
		}
	});
	
})(jQuery);