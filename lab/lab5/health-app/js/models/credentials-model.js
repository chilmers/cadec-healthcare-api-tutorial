var app = app || {};

(function( $ ) {

	var Credentials = Backbone.Model.extend({
		
		
		// TASK 1, STEP 1
		url: 'fixme',
		
		defaults : {
			password: '',
			basicAuth: '',
			username: '',			
			isAuthenticated: false,
			roles: []
		},
		
		initialize: function() {
		},
		
		isAuthenticatedWithRole: function(role) {
			return this.get('isAuthenticated') === true && _.contains(this.get('roles'), role)
		}
	});
	
	app.Credentials = new Credentials();
	
})(jQuery);