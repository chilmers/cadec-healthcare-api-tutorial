var app = app || {};

(function( $ ) {

	var Credentials = Backbone.Model.extend({
		defaults : {
			username: '',
			basicAuth: '',
			isLoggedIn: false
		},
		initialize: function() {
		}
	});
	
	app.Credentials = new Credentials();
	
})(jQuery);