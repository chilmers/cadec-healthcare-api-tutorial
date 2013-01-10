Lab 4
Objective: Create a backend that exposes an API for an app

First start your server by entering the simple-app-backend folder and start jetty (it will restart on changes to the target folder, e.g. when eclipse compiles code)
  
  mvn jetty:run

NB! Access tokens will now be stored in an in memory database, therefore you will need to redo the authorization flow (localhost:8080) each time the server restarts.


Task 1 -----------
  Add an endpoint to the API that produces JSON.

  Open the file AppAPIController.java.
  We have two annotations on the class, Controller and RequestMapping.
  These are used for telling Spring what to do with this class, it says that this is a controller 
  and that all methods in this class responds to /api/**

  Now find the getBookings method and inspect the RequestMapping annotation on that one.
  It says that this method will respond to /bookings, which in practice is /api/bookings since we are in the context of our controller.
  It also says that this method shall respond to GET requests.
  The ResponseBody annotation tells Spring MVC to convert the returned value to a suitable HTTP response.

  You can try it with: 
    
    curl -v http://localhost:8080/api/bookings

  As for now the method responds with a String and the content type will then be text/plain.
 
  From here we want to do two things,
  1) We want to tell Spring to respond as application/json by adding a produces parameter to the RequestMapping annotation
  2) We want to respond with booking data instead of a String.
  
  Look at the code below and try to understand what it does, then replace the getBookings method with this:

    @RequestMapping(method = RequestMethod.GET, value="/bookings", produces="application/json")
    public @ResponseBody List<Booking> getBookings() {
      // Get the logged in user
      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
      // Find the stored access token for the logged in user
      UserAccessToken userAccessToken = userAccessTokenRepository.findByUser(authentication.getName());
      String accessToken = null;
      if (userAccessToken != null) {
          accessToken = userAccessToken.getAccessToken();
      }
      // Use the access token to fetch the bookings of the logged in user
      return fetchSchedule(accessToken).getBookings();
    }

  When we say to Spring MVC that it shall produce application/json along with setting the ResponseBody 
  annotation on the return type it will use Jackson to try to map the returned value into JSON.

  Now try the curl command to retrieve some dummy booking data as json:

    curl -v http://localhost:8080/api/bookings





  
Task 2 -----------
  Fetch data from the SDK

  In lab 3, we used RestTemplate to fetch JSON as a String.
  RestTemplate can also, with a little help from Jackson, automatically map the 
  received JSON into Java objects.
  We now want to fetch the schedule from the SDK and map the response to or Bookings class.

  Step 1) Use RestTemplate to fetch bookings from the SDK 
    Open AppAPIController.java and alter the fetchSchedule method to look as follows:

    private Bookings fetchSchedule(String accessToken) {    
        RestTemplate scheduleEndpoint = new RestTemplate();
        MultiValueMap<String, String> headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken );
        HttpEntity<Void> requestEntity = new HttpEntity<Void>(headers);
        // RestTemplate uses Jackson to map the JSON response to POJOS with Jackson annotations.
        ResponseEntity<Bookings> scheduleEnpointResponse = scheduleEndpoint.exchange(API_SERVER_URL + "/crm/scheduling/v1/schedule", 
            HttpMethod.GET, requestEntity, Bookings.class);
        return scheduleEnpointResponse.getBody();
    }

    As you can see from the code above we are now telling the RestTemplate (scheduleEnpoint) to exchange information with the
    server and map the response body to the Bookings class.
    The solution will still not work, we also need the next step to make it work.

  Step 2) Map JSON to Java objects using annotations
 
    Jackson does a good job of mapping JSON to Java objects automatically
    as long as the structure and the property names of the JSON and the Java objects are identical. 
    If property names differ between the JSON and the Java objects we can help Jackson
    by annotating our Java class with the correct name to map a specific field against. 

    The SDK returns a property named timeslots where we have used bookings.
    We want to tell Jackson to map timeslots to bookings.

    Open the POJO Bookings.java and add JSON annotations to the code to make it look as follows:

    @JsonIgnoreProperties(ignoreUnknown = true)
    public class Bookings {

      @JsonProperty("timeslots")
      private List<Booking> bookings;

      @JsonProperty("timeslots")
      public List<Booking> getBookings() {
        return bookings;
      }

      @JsonProperty("timeslots")
      public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
      }

    }

    We have now told Jackson that the JSON property timeslots shall be mapped to the
    Java member variable bookings. We have also told Jackson to ignore unkown properties
    in the JSON to be able to cherry pick the goodies from the JSON structure and ignore 
    the rest.

    You can now test your API endpoint. 
    Since our token database is in-memory you probably need to go through the authorization flow again by browsing to http://localhost:8080
    When you have authorized the access you can test your endpoint by issuing the following curl command.
    
      curl -v http://localhost:8080/api/bookings







Task 3 ------------
  Add security
  
  We now have an API open for everyone to use anonymously, we want to force the users to be logged in.
  For the web pages (i.e. the oauth authorization mechanism) we need a form login and for the API we want 
  to use HTTP basic authentication.

  Look at the XML code below and read the comments. Take a minute to try to understand what the configuration does.
  Nevermind the /api/loginstatus and CORS/OPTIONS parts, these are needed for the app in the next lab.
  
  Open spring-security.xml (in src/main/webapp/WEB-INF) and replace the <http> element with the code below.

  <!-- Allow expressions such as hasRole('myRole') within thsi configuration block. -->
  <http use-expressions="true">
    <!-- Granting all anonymous web requests a particular identity and authorization-->
    <anonymous/>
    <!-- Permit all to check their login status -->
    <intercept-url pattern="/api/loginstatus" access="permitAll"/>
    <!-- Permit all HTTP OPTIONS calls to the API, which is needed for Cross Origin Resource Sharing (CORS) pre-flight 
        (CORS solves problems with Same Origin Policy and is needed when the app html is loaded from another origin than 
         the API, for example from the local file system) -->
    <intercept-url pattern="/api/**" access="permitAll" method="OPTIONS"/>
    <!-- Permit all to access login page and favicon.ico since browsers asks for that file-->
    <intercept-url pattern="/login*" access="permitAll"/>
    <intercept-url pattern="/favicon.ico" access="permitAll"/>
    <!-- Secure everything else to users having ROLE_USER -->
    <intercept-url pattern="/**" access="hasRole('ROLE_USER')" />
    <!-- Permit HTTP Basic Authentication, for easy access to the API (NB! should be used along with HTTPS in production systems) -->
    <http-basic />
    <!-- Also permit form login -->
    <form-login login-page="/login" default-target-url="/" authentication-failure-url="/loginfailed" />
    <!-- Send users to the login page when access is denied -->
    <access-denied-handler error-page="/login"/>
    <!-- And use /logout to logout -->
    <logout logout-success-url="/logout" />
  </http>

  We are now intercepting URLs and applying various kinds of access control.

  Restart your server and you are ready to test the solution again.
  1) Browse to http://localhost:8080 and log in as kallekula with password secret.
  2) Perform the authorization.
  3) Use curl with basic auth to access your API as kallekula  

    curl -v -H"Authorization: Basic a2FsbGVrdWxhOnNlY3JldA==" http://localhost:8080/api/bookings
  
  FYI:
  Base64Encode("kallekula:secret")  ->  a2FsbGVrdWxhOnNlY3JldA==

