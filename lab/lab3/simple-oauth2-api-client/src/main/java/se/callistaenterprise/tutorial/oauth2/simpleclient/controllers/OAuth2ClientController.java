package se.callistaenterprise.tutorial.oauth2.simpleclient.controllers;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang.StringUtils;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ModelAndView;

import se.callistaenterprise.tutorial.oauth2.simpleclient.types.AccessToken;

@Controller
@RequestMapping("")
public class OAuth2ClientController {

	private static final String API_SERVER_URL = "http://dev.apigw.minavardkontakter.se";
	private static final String STATE_SESSION_KEY = "oauth2-client.state";
	private static final String ACCESS_TOKEN_SESSION_KEY = "oauth2-client.accessToken";
	private static final String DEV_CLIENT_ID = "apitest";
	private static final String DEV_CLIENT_PASSWORD = "secret";
	private static final String CALLBACK_URL = "http://localhost:8080/back-from-authorization";
	
	@RequestMapping("/")
	public ModelAndView start(HttpSession session) {
		// Generate a random state to attach to the request
		// and store it in the session
		String randomState = UUID.randomUUID().toString();
		session.setAttribute(STATE_SESSION_KEY, randomState);
		
		String urlToAuthorization = API_SERVER_URL 
				+ "/oauth/authorize?"
				+ "client_id=" + DEV_CLIENT_ID
				+ "&response_type=code"
				+ "&scope=CRM_SCHEDULING_READ"
				+ "&state=" + randomState
				+ "&redirect_uri=" + urlEncode(CALLBACK_URL);
		
		ModelAndView mav = new ModelAndView();
		mav.setViewName("start");
		mav.addObject("urlToAuthorization", urlToAuthorization);
		return mav;
	}
	
	@RequestMapping("/back-from-authorization")
	public ModelAndView backFromAuthorization(String code, String state, HttpSession session) {
		String stateFromSession = (String) session.getAttribute(STATE_SESSION_KEY);
		if (StringUtils.isBlank(state) || !state.equals(stateFromSession)) {
			throw new RuntimeException("The state did not match! The session might have timed out or the " +
					"authorization might have been initialized by an unknown party.");
		}
		// Use the authorization code we just got to get an access token
		String accessToken = fetchAccessToken(code, state);
		// Store the access token in the session for later use
		session.setAttribute(ACCESS_TOKEN_SESSION_KEY, accessToken);
		
		ModelAndView mav = new ModelAndView();
		mav.setViewName("back");
		// Set some values in the model to be rendered in the view
		// This is not a normal thing to do with these codes, 
		// but since this is a demo we want to show the codes we got
		mav.addObject("authorizationCode", code);
		mav.addObject("accessToken", accessToken);
		return mav;
	}
	
	@RequestMapping("/show-schedule")
	public ModelAndView showSchedule(HttpSession session) {
		String accessToken = (String) session.getAttribute(ACCESS_TOKEN_SESSION_KEY);
		String schedule = fetchSchedule(accessToken);
		ModelAndView mav = new ModelAndView();
		mav.setViewName("schedule");
		mav.addObject("schedule", schedule);
		return mav;
	}
	
	/**
	 * Using RestTemplate to POST a request 
	 * to the token endpoint to exchange the code for an 
	 * access token.
	 * @param authorizationCode the code representing the authorization
	 * @param state the client generated state
	 * @return the received access token
	 */
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
	
	/**
	 * Use RestTemplate to fetch a patient schedule
	 * @param accessToken the access token for this patients scheduling information
	 * @return the schedule of this patient as json
	 */
	private String fetchSchedule(String accessToken) {
		RestTemplate scheduleEndpoint = new RestTemplate();
		MultiValueMap<String, String> headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + accessToken );
		HttpEntity<Void> requestEntity = new HttpEntity<Void>(headers);
		ResponseEntity<String> scheduleEnpointResponse = scheduleEndpoint.exchange(API_SERVER_URL + "/crm/scheduling/v1/schedule", 
				HttpMethod.GET, requestEntity, String.class);
		return scheduleEnpointResponse.getBody();
	}
	
	/**
	 * Calculates the Authorization header value for basic authentication
	 * @param username the username
	 * @param password the password
	 * @return the header value to set in the Authorization header for basic authentication
	 */
	private String calculateBasicAuthHeader(String username, String password) {
		String decodedCredentials = username + ":" + password; 
		String encodedCredentials = null;
		try {
			encodedCredentials = Base64.encodeBase64String(decodedCredentials.getBytes("UTF-8"));
		} catch (UnsupportedEncodingException e) {
			// UTF-8 was not available, try with the system default encoding.
			encodedCredentials = Base64.encodeBase64String(decodedCredentials.getBytes());
		}
		return "Basic " + encodedCredentials;
	}
	
	@SuppressWarnings("deprecation")
	private String urlEncode(String decoded) {
		String encoded = null;
		try {
			encoded = URLEncoder.encode(decoded, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			// UTF-8 was not available, try with the system default encoding.
			encoded =  URLEncoder.encode(decoded);
		}
		return encoded;
	}
	
}
