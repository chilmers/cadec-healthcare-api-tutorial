<html>
<body>
<h2>We are now back in the application!</h2>


<p>The authorization server attached an authorization code to the callback-url:
<ul>
	<li>authorization code: ${authorizationCode}</li>
</ul>

In the controller for this page we used the authorization code to fetch an access token from the oauth server:

<ul>
	<li>access token: ${accessToken}</li>
</ul>

<p>Now you can try to use the generated access token to reach the bookings of the person
you used for logging into Mina vårdkontakter.</p>

<ul>
	<li>
		<a href="./show-schedule">Fetch schedule</a>
	</li>
	<li>
		<a href="./..">Start over</a>
	</li>
</ul>
</body>
</html>
