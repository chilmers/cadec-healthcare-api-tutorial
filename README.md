# Welcome to CADEC Healthcare API Tutorial

##Introduction

This repository holds the presentation and labs for the healthcare API tutorial at Callista's Developer Conference 2013.

The tutorial is aimed to get started working with the API's presented at http://sdk.minavardkontakter.se .

In the end we will have a mobile enabled HTML/JavaScript app and a Java driven backend/API for our app.

The backend will in turn integrate with the healthcare APIs and will also be a working OAuth 2.0 client that is able to request authorization and retrieve access tokens.

##Prerequisites

Before you start with the labs, make sure you have the following set of prerequisites installed.

* Git 
	- Download and install from: [http://git-scm.com/downloads](http://git-scm.com/downloads)

* JDK 1.7
	- Download and install from: [http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html](http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html)
  - The JAVA_HOME environment variable shall be set to the JDK 1.7 home folder

* Maven 3.x
	- Download and install from: [http://apache.mirror3.ip-only.net/maven/maven-3/3.0.4/binaries/apache-maven-3.0.4-bin.zip](http://apache.mirror3.ip-only.net/maven/maven-3/3.0.4/binaries/apache-maven-3.0.4-bin.zip)

* BankID client
	- Download and install from: [https://install.bankid.com/](https://install.bankid.com/)

* Test certificates/IDs for BankID
	- Download from here: [http://www.bankid.com/Global/wwwbankidcom/RP/Test%20BankIDn.zip](http://www.bankid.com/Global/wwwbankidcom/RP/Test%20BankIDn.zip)
	- Or from here: [http://sdk.minavardkontakter.se/wp-content/uploads/2012/04/Test-E-leg.zip](http://sdk.minavardkontakter.se/wp-content/uploads/2012/04/Test-E-leg.zip). 
  - All of the test certificates have **password 123456qwerty**
  - Unzip them and import them into the BankID client

* cURL
  - Download on Windows: [http://curl.haxx.se/gknw.net/7.28.1/dist-w32/curl-7.28.1-rtmp-ssh2-ssl-sspi-zlib-idn-static-bin-w32.zip](http://curl.haxx.se/gknw.net/7.28.1/dist-w32/curl-7.28.1-rtmp-ssh2-ssl-sspi-zlib-idn-static-bin-w32.zip)
  - cURL is pre-installed on Mac OS X and most Linux distros

* Your favorite Maven enabled IDE/code editor (e.g. Eclipse IDE for Java EE Developers with M2E plugin)
  - If you know your things you might also manage to follow using any text editor, but it will be a bit trickier

* Text editor of choice (e.g. TextMate, Sublime, Vim, UltraEdit ...)

* Firefox ver>=17 with Firebug or Chrome ver>=23
