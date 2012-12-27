<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
	<title>App Backend - Inloggning</title>
</head>
<body>
	<header>
	    <h1>App Backend</h1>
	    <h2>Inloggning</h2>
	</header>
	
	<c:if test="${not empty error}">
	<div class="errorblock">
		Inloggningen misslyckades<br />
		Orsak : ${sessionScope["SPRING_SECURITY_LAST_EXCEPTION"].message}
	</div>
	</c:if>
	
	<div id="main">
	    <form name="f" method="POST" action="/j_spring_security_check">
	        <input type="text" placeholder="Användare" name="j_username" />
	        <input type="password" placeholder="Lösenord" name="j_password" />
	        <button type="submit">Logga in</button>
	    </form>
	</div>
	
	<footer>
	</footer>
</body>
</html>
