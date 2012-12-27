<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<body>
<h2>We got the schedule!</h2>
<ul>
	<li>schedule: ${schedule}</li>
	<li><a href="./..">Start over</a></li>
	<li>
		<a href="<c:url value="/j_spring_security_logout" />" > Logout</a>
	</li>
</body>
</html>
