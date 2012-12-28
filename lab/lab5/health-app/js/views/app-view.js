var app = app || {};

(function( $ ) {
	'use strict';
	
	// The Application
	// ---------------

	// Our overall **AppView** is the top-level piece of UI.
	app.AppView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#main',
		
		events: {
			'click button#fetch': 'fetchSchedule',
			'click button#login': 'login'
		},
		
		schedule: null,
		
		initialize: function() {
			app.Schedule.on( 'add', this.addOne, this );
			//app.Schedule.on( 'reset', this.addAll, this );
			//app.Schedule.on( 'change:completed', this.filterOne, this );
			//app.Schedule.on( 'filter', this.filterAll, this );
			//app.Schedule.on( 'all', this.render, this );
		},
		
		login: function() {
			console.log('logging in...');
			$.ajax({
				type: 'POST',
				url: 'http://localhost:8080/j_spring_security_check',
				data: {
					j_username: 'kallekula',
					j_password: 'secret'
				}
			}).done(function() { 
				alert('login done');
			}).fail(function() {
				alert('login failed');
			});
		},
		
		fetchSchedule: function() {
			app.Schedule.fetch({success:this.fetchSuccess, error:this.fetchError})
				.done(function() { 
					alert("f success"); 
				})
		    	.fail(function() { 
					alert("f error"); 
				})
		    	.always(function() { alert("f complete"); });			
		},
		
		fetchSuccess: function(collection, response, options) {
			alert('success');
		},
		
		fetchError: function(collection, xhr, options) {
			alert('error');			
		},
		
		render: function() {
			
		},

		// Add a single todo item to the list by creating a view for it, and
		// appending its element to the `<ul>`.
		addOne: function( booking ) {
			var view = new app.BookingView({ model: booking });
			$('#calendar').append( view.render().el );
		},

		// Add all items in the **Schedule** collection at once.
		addAll: function() {
			this.$('#calendar').html('');
			app.Schedule.each(this.addOne, this);
		},		
			
	});
	
})(jQuery);