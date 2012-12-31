var app = app || {};

(function( $ ) {

	app.Booking = Backbone.Model.extend({
		defaults : {
			bookingId: '',
			healthCareFacility: '',
			healthcareFacilityName: '',
			performer: '',
			performerName: '',
			purpose: '',
			reason: '',
			startTimeInclusive: '',
			endTimeExclusive: '',
			careType: '',
			careTypeName: '',
			timeType: '',
			timeTypeName: '',
			isInvitation: '',
			rebookingAllowed: ''
		},
		initialize: function() {
		}
	});
	    	        
})(jQuery);