	package com.schooleventcalendar.schooleventcalendar.service;
	
	import com.schooleventcalendar.schooleventcalendar.entity.EventEntity;
	import com.schooleventcalendar.schooleventcalendar.entity.UserEntity;
	import com.schooleventcalendar.schooleventcalendar.repository.EventRepository;
	import com.schooleventcalendar.schooleventcalendar.repository.UserRepository;
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.stereotype.Service;
	
	import java.util.Optional;
	
	@Service
	public class RegistrationService {
	
	    @Autowired
	    private EventRepository eventRepo;
	
	    @Autowired
	    private UserRepository userRepo;
	
	    public String registerStudent(int eventId, int studentId) {
	        Optional<EventEntity> optionalEvent = eventRepo.findById(eventId);
	        Optional<UserEntity> optionalUser = userRepo.findById(studentId);
	
	        if (optionalEvent.isEmpty()) {
	            throw new RuntimeException("Event with ID " + eventId + " not found");
	        }
	        if (optionalUser.isEmpty()) {
	            throw new RuntimeException("User with ID " + studentId + " not found");
	        }
	
	        EventEntity event = optionalEvent.get();
	        UserEntity student = optionalUser.get();
	
	        if (event.getParticipants().contains(student)) {
	            return "You are already registered for this event!";
	        }
	
	        event.getParticipants().add(student);
	        eventRepo.save(event);
	
	        return "Successfully registered for event!";
	    }
	}
