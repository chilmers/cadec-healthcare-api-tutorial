package se.callistaenterprise.tutorial.healthapi.resources;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Path("/schedule")
@Service("ScheduleResource")
public class ScheduleResource {

	
   private final static Logger log = LoggerFactory.getLogger(ScheduleResource.class);

//   @Autowired
//   private SchedulingServices schedulingServices;

	    /**
		 * Tjänsten hämtar alla bokade tider för en patient inom alla vårdenheter
		 * som finns tillgängliga i den engagemangs-index-tjänst som används.
		 * 
		 * @return Tjänsten returnerar de bokade tider och kallelser som finns
		 *         tillgängliga för patienten på de vårdenheter som finns i den
		 *         engagemangs-index-tjänst som används. Öppna kallelser ingår inte i
		 *         svaret.<br/>
		 * <br/>
		 *         TimeSlotDetail [0..*]<br/>
		 *         - startTimeInclusive[1..1]<br/>
		 *         - endTimeExclusive[1..1]<br/>
		 *         - healthcare_facility [1..1]<br/>
		 *         - performer[0..1]<br/>
		 *         - bookingId[1..1]<br/>
		 *         - subject_of_care[1..1]<br/>
		 *         - purpose[0..1]<br/>
		 *         - reason[0..1]<br/>
		 *         - resourceName[0..1]<br/>
		 *         - healthcare_facility_name[0..1]<br/>
		 *         - performerName[0..1]<br/>
		 *         - resourceID[0..1]<br/>
		 *         - timeTypeName[0..1]<br/>
		 *         - timeTypeID[0..1]<br/>
		 *         - careTypeName[0..1]<br/>
		 *         - careTypeID[0..1]<br/>
		 *         - cancel_booking_allowed[0..1]<br/>
		 *         - rebooking_allowed[0..1]<br/>
		 *         - message_allowed[0..1]<br/>
		 *         - isInvitation [0..1]<br/>
		 */
	    @GET
	    @Consumes
	    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	    @Path("")
	    public String getSubjectOfCareSchedule() {
	    	log.debug("getSubjectOfCareSchedule");
//	    public TimeslotsType getSubjectOfCareSchedule() {    	
//	    	log.debug("getSubjectOfCareSchedule()");
//	        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//	        UserDetails user = (UserDetails) principal;
//	        String subjectOfCareId = user.getUsername();
//	        AggregatedScheduleResponseHolder response = schedulingServices.getSubjectOfCareScheduleNational(subjectOfCareId);
	        return "Schedule";
	    }
	
}
