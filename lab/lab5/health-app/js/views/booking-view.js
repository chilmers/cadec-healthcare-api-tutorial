var app = app || {};

(function( $ ) {
	'use strict';
	
	app.BookingView = Backbone.View.extend({
		
		//... is a list tag.
		tagName:  'li',

		// Cache the template function for a single item.
		template: null,
		
		events: {
		},
		
		initialize: function() {
			this.template = _.template( $('#booking_template').html() );
		},
		
		// Re-render the booking
		render: function() {
			this.$el.html( this.template( this.model.toJSON() ) );
			return this;
		}
	});
	
})(jQuery);