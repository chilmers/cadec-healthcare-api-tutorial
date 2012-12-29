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
			this.render();
		},
		
		login: function() {
			console.log('logging in...');
			$.ajax({
				type: 'POST',
				url: 'http://localhost:8080/api/login',
				data: {
					j_username: 'kallekula',
					j_password: 'secret'
				},
		        success: function(data, status) {
		            if (data.loggedIn) {
		                // success
		                dialog.dialog('close');
		                location.href= getHost() + '/users';
		            } else {
						alert("success but fail")
		                //loginFailed(data);
		            }
		        },
				error: function() {
					alert('inner error');
				},
				xhrFields: {
			      withCredentials: true
			   	}
			}).done(function() { 
				alert('login done');
			}).fail(function() {
				alert('login failed');
			});
		},
		
		fetchSchedule: function() {
			$.ajax({
				type: 'GET',
				url: 'http://localhost:8080/api/bookings',
				success: this.fetchSuccess, 
				error: this.fetchError,
				beforeSend: function (xhr) { 
						xhr.setRequestHeader ("Authorization", "Basic a2FsbGVrdWxhOnNlY3JldA==");
				}
			}).done(function() { 
				alert("f success"); 
			}).fail(function() {
				alert("f fail"); 
			});
			
			/*
			app.Schedule.fetch({
				success: this.fetchSuccess, 
				error: this.fetchError,
				beforeSend: function (xhr) { xhr.setRequestHeader ("Authorization", "Basic a2FsbGVrdWxhOnNlY3JldA=="); },
				xhrFields: {
			      withCredentials: true
			   	}
			})
				.done(function() { 
					alert("f success"); 
				})
		    	.fail(function() { 
					alert("f error"); 
				})
		    	.always(function() { alert("f complete"); });
		*/			
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