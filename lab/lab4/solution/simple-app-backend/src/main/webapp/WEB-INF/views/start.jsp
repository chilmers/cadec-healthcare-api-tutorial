<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
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
	
	<ul>
		<li><a href="${urlToAuthorization}">${urlToAuthorization}</a></li>
		<li><a href="<c:url value="/j_spring_security_logout" />">Logout</a></li>
	</ul>

</body>
</html>
