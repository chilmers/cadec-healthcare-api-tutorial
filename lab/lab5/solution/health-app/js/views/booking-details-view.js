var app = app || {};

(function( $ ) {
	'use strict';
	
	app.BookingDetailsView = Backbone.View.extend({
		
		el:  '#bookingDetailsView',
		
		model: null,

		template: null,
		
		events: {
		},
		
		initialize: function() {
			this.template = _.template( $('#booking_details_template').html() );
		},
		
		// Re-render the booking
		render: function() {
			var renderedTemplate = this.template( this.model.toJSON() );
			this.$el.html( renderedTemplate );
			return this;
		}
	});
	
})(jQuery);