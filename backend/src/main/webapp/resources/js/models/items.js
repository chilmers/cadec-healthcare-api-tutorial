(function() {

	var app.Item = Backbone.Model.extend({
		defaults : {
			part1 : 'hello',
			part2 : 'world'
		}
	});
	
	  var app.List = Backbone.Collection.extend({
		    model: Item
		  });
}
	  
		      render: function(){

		    	        var self = this;      
		    	        $(this.el).append("<button id='add'>Add list item</button>");
		    	        $(this.el).append("<ul></ul>");
		    	        _(this.collection.models).each(function(item){ // in case collection is not empty
		    	          self.appendItem(item);
		    	        }, this);
		    	      },		  
		    	      addItem: function(){
		    	          this.counter++;
		    	          var item = new Item();
		    	          item.set({
		    	            part2: item.get('part2') + this.counter // modify item defaults
		    	          });
		    	          this.collection.add(item); // add item to collection; view is updated via event 'add'
		    	        },		    	      
	
    appendItem: function(item){
      $('ul', this.el).append("<li>"+item.get('part1')+" "+item.get('part2')+"</li>");
    }
  });		    	        
})(jQuery);