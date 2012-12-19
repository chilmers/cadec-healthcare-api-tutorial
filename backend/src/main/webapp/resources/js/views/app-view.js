var app = app || {};

(function( $ ) {
	'use strict';
	
	app.AppView = Backbone.View.extend({
		
		el: $('body'), // attaches `this.el` to an existing element.
		
		events: {
			'click button#add': 'addItem'	
		},
		
		initialize: function() {
//	      _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods
	        
	        this.collection = new app.List();
	        this.collection.bind('add', this.appendItem); // collection event binder
			
			this.counter = 0; // total number of items added thus far
			this.render(); // not all views are self-rendering. This one is.			
		},
		
		render: function() {
			 $(this.el).append("<button id='add'>Add list item</button>");
			$(this.el).append("<ul></ul>");
		},
		
		addItem: function(){
			this.counter++;
			$('ul', this.el).append("<li>hello world"+this.counter+"</li>");
		}
		
	});
	
})(jQuery);