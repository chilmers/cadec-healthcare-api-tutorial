package se.callistaenterprise.tutorial.healthcare.app.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import se.callistaenterprise.tutorial.healthcare.app.backend.repositories.UserAccessTokenRepository;
import se.callistaenterprise.tutorial.healthcare.app.backend.types.Booking;
import se.callistaenterprise.tutorial.healthcare.app.backend.types.Bookings;
import se.callistaenterprise.tutorial.healthcare.app.backend.types.UserAccessToken;

@Controller
@RequestMapping("/api")
public class AppAPIController {

	private static final String API_SERVER_URL = "http://dev.apigw.minavardkontakter.se";
	
	@Autowired
	private UserAccessTokenRepository userAccessTokenRepository;
	
	@RequestMapping(method = RequestMethod.GET, value="/bookings", produces="application/json")  
	public @ResponseBody List<Booking> getBookings() {
		UserAccessToken userAccessToken = userAccessTokenRepository.findByUser("kallekula");
		return fetchSchedule(userAccessToken.getAccessToken()).getBookings();
	}
	
	/**
	 * Use RestTemplate to fetch a patient schedule
	 * @param accessToken the access token for this patients scheduling information
	 * @return the schedule of this patient as json
	 */
	private Bookings fetchSchedule(String accessToken) {		
		RestTemplate scheduleEndpoint = new RestTemplate();
		MultiValueMap<String, String> headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + accessToken );
		HttpEntity<Void> requestEntity = new HttpEntity<Void>(headers);
		ResponseEntity<Bookings> scheduleEnpointResponse = scheduleEndpoint.exchange(API_SERVER_URL + "/crm/scheduling/v1/schedule", 
				HttpMethod.GET, requestEntity, Bookings.class);
		return scheduleEnpointResponse.getBody();
	}
	
}
