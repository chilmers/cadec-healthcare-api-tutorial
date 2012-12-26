package se.callistaenterprise.tutorial.healthcare.app.backend.types;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Booking {

	private String bookingId;
	
	private String healthCareFacility;
	private String healthcareFacilityName;
	
	private String performer;
	private String performerName;
	
	private String purpose;
	private String reason;
	
	private String startTimeInclusive;
	private String endTimeExclusive;
	
	private String careType;
	private String careTypeName;
	
	private String timeType;
	private String timeTypeName;
	
	private Boolean isInvitation;
	private Boolean rebookingAllowed;

	public String getBookingId() {
		return bookingId;
	}

	public void setBookingId(String bookingId) {
		this.bookingId = bookingId;
	}

	public String getHealthCareFacility() {
		return healthCareFacility;
	}

	public void setHealthCareFacility(String healthCareFacility) {
		this.healthCareFacility = healthCareFacility;
	}

	public String getHealthcareFacilityName() {
		return healthcareFacilityName;
	}

	public void setHealthcareFacilityName(String healthcareFacilityName) {
		this.healthcareFacilityName = healthcareFacilityName;
	}

	public String getPerformer() {
		return performer;
	}

	public void setPerformer(String performer) {
		this.performer = performer;
	}

	public String getPerformerName() {
		return performerName;
	}

	public void setPerformerName(String performerName) {
		this.performerName = performerName;
	}

	public String getPurpose() {
		return purpose;
	}

	public void setPurpose(String purpose) {
		this.purpose = purpose;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getStartTimeInclusive() {
		return startTimeInclusive;
	}

	public void setStartTimeInclusive(String startTimeInclusive) {
		this.startTimeInclusive = startTimeInclusive;
	}

	public String getEndTimeExclusive() {
		return endTimeExclusive;
	}

	public void setEndTimeExclusive(String endTimeExclusive) {
		this.endTimeExclusive = endTimeExclusive;
	}

	public String getCareType() {
		return careType;
	}

	public void setCareType(String careType) {
		this.careType = careType;
	}

	public String getCareTypeName() {
		return careTypeName;
	}

	public void setCareTypeName(String careTypeName) {
		this.careTypeName = careTypeName;
	}

	public String getTimeType() {
		return timeType;
	}

	public void setTimeType(String timeType) {
		this.timeType = timeType;
	}

	public String getTimeTypeName() {
		return timeTypeName;
	}

	public void setTimeTypeName(String timeTypeName) {
		this.timeTypeName = timeTypeName;
	}

	public Boolean getIsInvitation() {
		return isInvitation;
	}

	public void setIsInvitation(Boolean isInvitation) {
		this.isInvitation = isInvitation;
	}

	public Boolean getRebookingAllowed() {
		return rebookingAllowed;
	}

	public void setRebookingAllowed(Boolean rebookingAllowed) {
		this.rebookingAllowed = rebookingAllowed;
	}

}
