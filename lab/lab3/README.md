#Lab 3
Objective: Create a simple oauth2 client that obtains an access token and fetches a resource

##Task 1: Start the third party client

  From this folder, run the following
~~~~
  >cd simple-oauth2-api-client
  >mvn jetty:run
~~~~

  This will start the simple-oauth2-api-client in jetty

  Open your browser and point it to [http://localhost:8080](http://localhost:8080) to access the application

  Expected outcome:

  You will end up at the first page saying that we need to navigate to Mina vårdkontakter in order to authorize usage of the scheduling API.
  The link is still not working so don't click it yet.

##Task 2: Requesting authorization

  To be able to get authorization from the user, we need to send the user to Mina Vårdkontakter to approve our authorization request.
  This is done by letting the user's browser access the authorization dialog in MVK with a given set of URL parameters.


###Step 1: 
  Open the OAuth2ClientController.java in your IDE/editor and find the start method which responds to the root (/) of our application.

###Step2:
  The URL to the authorization dialog is incorrect, update it so that it produces a correct URL to the authorization dialog by following
  the steps.

  Find the controller method corresponding to http://localhost:8080/ in the Java code.
  Find the urlToAuthorization variable which at this stage has an incorrect value.
  Paste this to correctly set the urlToAuthorization variable:

~~~~
        String urlToAuthorization = API_SERVER_URL 
        + "/oauth/authorize?"
        + "client_id=" + DEV_CLIENT_ID
        + "&response_type=code"
        + "&scope=CRM_SCHEDULING_READ"
        + "&state=" + randomState
        + "&redirect_uri=" + urlEncode(CALLBACK_URL);
~~~~
  The link on the first page (http://localhost:8080/) shall now look something like this:

~~~~
        http://dev.apigw.minavardkontakter.se/oauth/authorize
          ?client_id=apitest
          &response_type=code
          &scope=CRM_SCHEDULING_READ
          &state=dc4beb37-4540-4703-b87e-160c8600ff33    (NB! random generated number, different every time)
          &redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fback-from-authorization
~~~~

The URL now says that: 

* our client's id is apitest (**client_id**) which is an existing client available in the development environment for testing,
* we want to do authorization using authorization code (**response_type**),
* the scope of the authorization is given by CRM_SCHEDULING_READ i.e. read permission on scheduling information (**scope**),
* we have a randomly generated state that is known to the client (**state**),
* and we have a URL encoded callback URL where we want to return to after the authorization which in decoded form is http://localhost:8080/back-from-authorization (**redirect_uri**).

The parameters are also described in detail at the SDK site, section 1 (Dirigera om användaren till auktorisations-dialogen i Mina vårdkontakter) on this page: [http://sdk.minavardkontakter.se/sv/sdk-api/svenska-anvisningar-for-uppkopling-till-patientdata-apierna/](http://sdk.minavardkontakter.se/sv/sdk-api/svenska-anvisningar-for-uppkopling-till-patientdata-apierna/)

You can now test to click the link and login to the authorization dialog using BankID and the test certificates, [http://sdk.minavardkontakter.se/wp-content/uploads/2012/04/Test-E-leg.zip](http://sdk.minavardkontakter.se/wp-content/uploads/2012/04/Test-E-leg.zip) 

All certificates have **password** 123456qwerty

You will get a warning that this is unsafe since we are not using HTTPS in the development environment, it is ok to continue at this stage.






##Task 3: Handle the response from the authorization dialog and collect an access token.

  Find the code responding to the callback url (/back-from-authorization) in the OAuth2ClientController.java
  The authorization dialog has appended some important parameters on the callback URL which are mapped to parameters in the controller method.
  Notice the code and state parameters in the Java method.

###Step 1: Verify the state returned from the authorization dialog by pasting the following code where it says: 

---- ADD CODE FOR VERIFYING STATE HERE ----

~~~~
    String stateFromSession = (String) session.getAttribute(STATE_SESSION_KEY);
    if (StringUtils.isBlank(state) || !state.equals(stateFromSession)) {
      throw new RuntimeException("The state did not match! The session might have timed out or the " +
          "authorization might have been initialized by an unknown party.");
    } 
~~~~
 
###Step 2: Exchange the code in the method for fetching the access token with the code given below.

~~~~
    private String fetchAccessToken(String authorizationCode, String state) {
      RestTemplate tokenEndpoint = new RestTemplate();
      MultiValueMap<String, String> headers = new HttpHeaders();
      // In the development environment we use basic authentication instead of SSL certificates
      headers.set("Authorization", calculateBasicAuthHeader(DEV_CLIENT_ID, DEV_CLIENT_PASSWORD) );
      HttpEntity<Void> requestEntity = new HttpEntity<Void>(headers);
      ResponseEntity<AccessToken> tokenEnpointResponse = tokenEndpoint.exchange(API_SERVER_URL 
          + "/oauth/token?grant_type=authorization_code&code={1}&state={2}&redirect_uri={3}", 
          HttpMethod.POST, requestEntity, AccessToken.class, 
          authorizationCode, state, CALLBACK_URL); // no need to URL encode CALLBACK_URL here since RestTemplate does this.
      return tokenEnpointResponse.getBody().getAccessToken();
  }
~~~~






##Task 4: Use access token to fetch the user's schedule

  When you click the fetch-schedule link, an empty schedule will appear.
  We need to use our access token to fetch the schedule.
  Find the method responding to the /show-schedule URL and locate the usage of fetchSchedule method.
  Replace the method for fetching the schedule with the following code that uses an access token:

~~~~
  private String fetchSchedule(String accessToken) {
    RestTemplate scheduleEndpoint = new RestTemplate();
    MultiValueMap<String, String> headers = new HttpHeaders();
    headers.set("Authorization", "Bearer " + accessToken );
    HttpEntity<Void> requestEntity = new HttpEntity<Void>(headers);
    ResponseEntity<String> scheduleEnpointResponse = scheduleEndpoint.exchange(API_SERVER_URL + "/crm/scheduling/v1/schedule", 
        HttpMethod.GET, requestEntity, String.class);
    return scheduleEnpointResponse.getBody();
  }
~~~~

