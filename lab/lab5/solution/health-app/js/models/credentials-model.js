var app = app || {};

(function( $ ) {

	var Credentials = Backbone.Model.extend({
		
		url: 'http://localhost:8080/api/loginstatus',
		
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