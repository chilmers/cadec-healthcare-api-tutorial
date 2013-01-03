var app = app || {};

(function( $ ) {
	'use strict';
	
	app.BookingDetailsView = Backbone.View.extend({
		
		el:  '#bookingDetails',
		
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
			this.$el.attr('data-role', 'page');
			this.$el.trigger('create');
			return this;
		}
	});
	
})(jQuery);