<!doctype html>
<body>
<h2>Welcome to the simple OAuth 2.0 client</h2>
<p>
Now we are going to request an access token for accessing scheduling information.<br/>
This is done by navigating the browser to the authorization page in Mina vårdkontakter where the user can approve or deny the request.<br/>
If the user is not logged in already he/she will be asked to login to Mina vårdkontakter first.
<p> 
<p>
Start with inspecting the link below and try to get an understanding of what the different parameters are used for.<br/>
Take a special look at the URL encoded redirect_uri which is the URL we will return to after the authorization in Mina vårdkontakter.<br/>
When you are ready, click the link to go on with the authorization.<br/> 
</p>

<a href="${urlToAuthorization}"><h2>${printableUrlToAuthorization}</h2></a>

</body>
</html>
