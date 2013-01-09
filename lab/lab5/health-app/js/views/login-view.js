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
			
			// TASK 1, STEP 2
			// CHECK LOGIN STATUS WITH THE API BACKEND USING BASIC AUTH
			
			// EXCHANGE FROM HERE...
			alert("FIX ME!!");
			$.mobile.loading('hide');
			// TO HERE
			
			
		}
	});
	
})(jQuery);