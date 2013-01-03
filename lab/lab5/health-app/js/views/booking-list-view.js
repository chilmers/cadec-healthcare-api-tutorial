var app = app || {};

(function( $ ) {
	'use strict';
	
	// The Application
	// ---------------

	// Our overall **AppView** is the top-level piece of UI.
	app.BookingListView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#bookingList',
		
		template: null,
		
		events: {
			'click a#fetch': 'fetchSchedule',
			//'tap a#fetch': 'fetchSchedule'
		},
		
		initialize: function() {
			this.template = _.template( $('#booking_list_template').html() );
			app.Schedule.on( 'add', this.addOne, this );
		},
		
		fetchSchedule: function() {
			app.Schedule.reset();
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
			var renderedTemplate = this.template();
			this.$el.html( renderedTemplate );
			this.$el.attr('data-role', 'page');
			this.$el.trigger('create');
			return this;
		},

		// Add a single todo item to the list by creating a view for it, and
		// appending its element to the `<ul>`.
		addOne: function( booking ) {
			var view = new app.BookingView({ model: booking });
			var bookingView = view.render();
			$('ul.ui-listview').append( view.el ).listview('refresh');
		},

		// Add all items in the **Schedule** collection at once.
		addAll: function() {
			$('ul.ui-listview ui-btn').html('');
			app.Schedule.each(this.addOne, this);
		},		
			
	});
	
})(jQuery);