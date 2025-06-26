package com.schooleventcalendar.schooleventcalendar.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.schooleventcalendar.schooleventcalendar.entity.EventEntity;
import com.schooleventcalendar.schooleventcalendar.entity.UserEntity;
import com.schooleventcalendar.schooleventcalendar.exception.NameNotFoundException;
import com.schooleventcalendar.schooleventcalendar.repository.EventRepository;
import com.schooleventcalendar.schooleventcalendar.repository.UserRepository;
import com.schooleventcalendar.schooleventcalendar.exception.NameErrorResponse;

@Service
public class EventService {
	@Autowired
	EventRepository eventRepo;
	
	@Autowired
	UserRepository userRepo;
	
	public EventService() {
		super();
	}
	
	public EventEntity postEvent(EventEntity event) {
		return eventRepo.save(event);
	}
	
	public List<EventEntity> getAllEvents() {
		return eventRepo.findAll();
	}
	
	@SuppressWarnings("finally")
	public EventEntity putEvent(int id, EventEntity newEventDetails) {
		EventEntity event = new EventEntity();
		
		try {
			event = eventRepo.findById(id).get();
			
			event.setEventName(newEventDetails.getEventName());
			event.setEventSchedule(newEventDetails.getEventSchedule());
			event.setStartTime(newEventDetails.getStartTime());
			event.setEndTime(newEventDetails.getEndTime());
			event.setEventLocation(newEventDetails.getEventLocation());
			event.setEventDescription(newEventDetails.getEventDescription());
			event.setEventCreateDate(newEventDetails.getEventCreateDate());
			event.setEventIsActive(newEventDetails.getEventIsActive());
		} catch (NoSuchElementException ex) {
			throw new NameNotFoundException("Event " + id + " does not exist!");
		} finally {
			return eventRepo.save(event);
		}
	}
	
	public String deleteEvent(int event_id) {
		String msg = "";
		if (eventRepo.findById(event_id).isPresent()) {
			eventRepo.deleteById(event_id);
			msg = "Event " + event_id + " is successfully deleted!";
		} else {
			msg = event_id + " does not exist!";
		}
		return msg;
	}
	
	public ResponseEntity<String> registerStudentToEvent(int eventId, String username) {
		var eventOpt = eventRepo.findById(eventId);
		if (eventOpt.isEmpty()) {
			return new ResponseEntity<>("Event not found", HttpStatus.NOT_FOUND);
		}

		UserEntity user = userRepo.findByUsername(username);
		if (user == null) {
			return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
		}

		if (user.getTypeUser() != UserEntity.UserType.S) {
			return new ResponseEntity<>("Only students can register for events", HttpStatus.FORBIDDEN);
		}

		EventEntity event = eventOpt.get();

		if (event.getParticipants().contains(user)) {
			return new ResponseEntity<>("User already registered", HttpStatus.CONFLICT);
		}

		event.getParticipants().add(user);
		eventRepo.save(event);

		return new ResponseEntity<>("Successfully registered for the event", HttpStatus.OK);
	}

	public List<EventEntity> getJoinedEvents(String username) {
		UserEntity user = userRepo.findByUsername(username);
		if (user == null) {
			throw new NameNotFoundException("User not found");
		}
		return eventRepo.findByParticipantsContaining(user);
	}

	public ResponseEntity<String> leaveEvent(int eventId, String username) {
		var eventOpt = eventRepo.findById(eventId);
		if (eventOpt.isEmpty()) {
			return new ResponseEntity<>("Event not found", HttpStatus.NOT_FOUND);
		}

		UserEntity user = userRepo.findByUsername(username);
		if (user == null) {
			return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
		}

		EventEntity event = eventOpt.get();

		if (!event.getParticipants().contains(user)) {
			return new ResponseEntity<>("User is not registered for this event", HttpStatus.BAD_REQUEST);
		}

		event.getParticipants().remove(user);
		eventRepo.save(event);

		return new ResponseEntity<>("Successfully left the event", HttpStatus.OK);
	}
	
    @ExceptionHandler
    public ResponseEntity<NameErrorResponse> handleException(NameNotFoundException ex) {
        NameErrorResponse error = new NameErrorResponse();
        error.setStatus(HttpStatus.NOT_FOUND.value());
        error.setMessage(ex.getMessage());
        error.setTimestamp(System.currentTimeMillis());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<NameErrorResponse> handleException(Exception ex) {
        NameErrorResponse error = new NameErrorResponse();
        error.setStatus(HttpStatus.BAD_REQUEST.value());
        error.setMessage(ex.getMessage());
        error.setTimestamp(System.currentTimeMillis());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}
