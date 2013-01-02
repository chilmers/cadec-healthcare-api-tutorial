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
			'click a#fetch': 'fetchSchedule',
			'tap a#fetch': 'fetchSchedule',
			'mousedown a#fetch': 'fetchSchedule',
		},
		
		initialize: function() {
			app.Schedule.on( 'add', this.addOne, this );
			//app.Schedule.on( 'reset', this.addAll, this );
			//app.Schedule.on( 'change:completed', this.filterOne, this );
			//app.Schedule.on( 'filter', this.filterAll, this );
			//app.Schedule.on( 'all', this.render, this );
			this.render();
		},
		
		fetchSchedule: function() {
			app.Schedule.fetch({
				beforeSend: function (xhr) { 
					xhr.setRequestHeader ("Authorization", "Basic a2FsbGVrdWxhOnNlY3JldA=="); 
				}
			})
			.done($.proxy(function() { 
					this.addAll();
					}, this))
		    .fail(function() { 
				alert("fetch error"); 
			});
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