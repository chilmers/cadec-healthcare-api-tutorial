package se.callistaenterprise.tutorial.healthcare.app.backend.types;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

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
