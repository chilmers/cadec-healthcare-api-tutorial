var app = app || {};

(function( $ ) {
	'use strict';
	
	app.LoginView = Backbone.View.extend({
		
		el:  '#login',

		events: {
			'click #loginButton' : 'login',
			'keypress :input' : 'handleKeypress'
		},
		
		model: null,
		
		initialize: function() {
			this.$el.dialog({ modal: true, 
					closeOnEscape: false,
					closeBtnText: ""
					});
		},
		
		reset: function() {
			this.$el.find("#username").attr("value", "");
			this.$el.find("#password").attr("value", "");
		},
		
		// Re-render the booking
		render: function() {
			this.$el.find("#username").attr("value", this.model.get('username'));		
			this.$el.find("#password").attr("value", this.model.get('password'));
			return this;
		},
		
		handleKeypress: function(event) {
			if (event.keyCode === 13) {
				$("#loginButton").click();
			}
		},
		
		login: function() {
			var username = this.$el.find("#username").attr("value");
			var password = this.$el.find("#password").attr("value");
			this.model.set('basicAuth', base64_encode(username + ':' + password));
			this.model.set('username', username);
			this.model.set('password', password);
			$.mobile.loading( 'show', {
				text: 'Logging in...',
				textVisible: true
			});

			// Fill the model (i.e. app.Credentials) with loginstatus information
			this.model.fetch({
				success: $.proxy(function(model, response, options) {
							if (model.isAuthenticatedWithRole('ROLE_USER')) {
								this.reset();
								$.mobile.changePage("#bookingList", {changeHash:true, dataUrl: '#bookingList', transition:'flip'});
							} else {
						     alert("Not logged in, try again"); 
							}
						 }, this),
				error: function () { 
					     alert("Not logged in, try again"); 
					   },
				beforeSend: function (xhr) {
								xhr.setRequestHeader ("Authorization", "Basic " + app.Credentials.get('basicAuth')); 
							}
			})
			.always( function() {
				$.mobile.loading('hide');
			});
			
		}
	});
	
})(jQuery);