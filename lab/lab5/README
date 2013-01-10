Lab 5
Objective: Connect the My Healthcare Calendar app to the backend

The purpose of this lab is to learn how to connect an app to your API.
Unfortunately we will not have time to go into details on backbone.js or jQuery mobile
which was used to create the app. Instead we will focus on the integration with the API.
If you want to understand more of the app later, there is a lot to read at these pages:
	
	http://backbonejs.org
	http://jquerymobile.com


Prerequisites:

	Since we are to connect an app to the backend we need the backend from lab4 to be running.
	Go to lab4/solution/simple-app-backend and run

		mvn jetty:run
	
	Also make sure that you have browsed to http://localhost:8080 and authorized access to the SDK API.


Task 1 --------

	Go to the folder health-app and open the index.html in a browser. 
	Use preferably Firefox or Chrome, IE might not work since there are problems with IE and CORS in jQuery. (http://bugs.jquery.com/ticket/8283)
	
	You will end up at the login page but if you try to login you will notice that this doesn't work.
	
	The strategy is to check the credentials given using the /api/loginstatus endpoint.

	To do this we need to setup the url to the login status endpoint in the credentials-model.js 
	which is used as a model in login-view.js and call the fetch function (which updates the model from the url) 
	on the model when the login button is clicked in the view.
	
	Step 1) Set the correct URL

		Open credentials-model.js and exchange the URL with the one below.
	
			url: 'http://localhost:8080/api/loginstatus',
	
	
	Step 2) Update the model with data from the API when the login button is clicked
	
		Open login-view.js and find the login function.
		The login view uses the credentials model as its' model.
		We need to update the model by calling the function fetch which is a Backbone function that uses jQuery's ajax capabilities
		to fetch the url given in the model and update the model with the fields in the returned JSON object.
		Since Backbone use jQuery's AJAX capabilities we can also add functions like beforeSend to alter the request 
		before it is sent, just as in jQuery. We use this to set the basic auth header as you will notice below.
		
		To call fetch you need to exchange some of the existing code in the login function of the login view with the one below:
	
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
	
	
	If you reload the page you should now be able to log in to the app with username kallekula and password secret
	
	
Task 2 --------------

	When you are logged in you will end up att the main view of the app which is a list of bookings.
	The list is empty so we need to fetch some bookings using the API.
	
	The view we currently are located in is the BookingListView which is located in views/booking-list-view.js
	where we have attached an event listener to the Fetch bookings button.
	
	The model used in this view is a backbone collection. The collection is similar to a backbone model object but
	holds a collection of models.
	In the same way as with the backbone model, a backbone collection can hold a URL and can be updated using the fetch function.
	The difference is that the fetch function expects an array of object to be returned at the URL.
	
	So we need to do the same procedure as with the login.
	
	Since this is the last task you can either try it yourself or take a look further down for the solution...
	
	We need to... 
	
	1) Add a loading wheel showing that we are currently loading the bookings (use $.mobile.loading( 'show',text: 'Loading bookings',textVisible: true}) )
	2) Call reset on the app.Schedule collection to empty it
	3) Update app.Schedule to fetch new data from its' URL
	4) If the fetch was successful we need to render the booking-list, using the data in the collection (Hint: we just did a fetch in the login-view.js) 
	5) We also want to change the text of the Fetch button to "Update bookings"
	6) If the fetch fails we want an alert dialog saying that womething went wrong
	7) Of course we also want to close the loading wheel, both on success or failure. ($.mobile.loading('hide'))
	
	Finished!
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	SPOILER WARNNING..... 1
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
		SPOILER WARNNING..... 2
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
			SPOILER WARNNING..... 3      ARE YOU SURE??
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
	
	
	
	
			CHEATER! OK here it is!
	
	
	
	
	Exchange the event listener of the button in booking-list-view.js with this:
	
fetchSchedule: function() {
	$.mobile.loading( 'show', {
		text: 'Loading bookings',
		textVisible: true,
	});
	app.Schedule.reset();
	app.Schedule.fetch({
		beforeSend: function (xhr) {
			// Here we use basic auth credentials from the currently logged in user 
			xhr.setRequestHeader ("Authorization", "Basic " + app.Credentials.get('basicAuth')); 
		}
	})
	.done(
		// Use jQuery proxy to make sure that the event callback function gets correct "this" context
		$.proxy(function() {
			// on success we want to render the bookings list
			this.render();
			// and update the text on the fetch button to "Update bookings"
			$("a#fetch .ui-btn-text").html("Update bookings");
		}, this)
	)
    .fail(function() { 
		alert("fetch error");
	})
	.always( function() {
		$.mobile.loading('hide');
	});
},	
	
	
	
