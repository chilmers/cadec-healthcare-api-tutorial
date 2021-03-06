package se.callistaenterprise.tutorial.healthcare.app.backend.types;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;


// TASK 2, STEP 2
// ---- ADD ANNOTATIONS TO THE CLASS AND MEMBER ----
// ---- VARIABLES TO HELP JACKSON MAP JSON FROM THE SDK ---- 

public class Bookings {
	
	private List<Booking> bookings = new ArrayList<Booking>();

	public List<Booking> getBookings() {
		return bookings;
	}

	public void setBookings(List<Booking> bookings) {
		this.bookings = bookings;
	}
	
}
