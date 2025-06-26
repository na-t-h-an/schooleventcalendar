package com.schooleventcalendar.schooleventcalendar.controller;

import com.schooleventcalendar.schooleventcalendar.entity.EventEntity;
import com.schooleventcalendar.schooleventcalendar.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class EventController {

    @Autowired
    EventService eserv;

    // Create event
    @PostMapping("/postEvent")
    public ResponseEntity<EventEntity> postEvent(@RequestBody EventEntity event) {
        try {
            EventEntity createdEvent = eserv.postEvent(event);
            return new ResponseEntity<>(createdEvent, HttpStatus.CREATED); // Return 201 Created
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Read events
    @GetMapping("/getEvents")
    public ResponseEntity<List<EventEntity>> getEvents() {
        try {
            List<EventEntity> events = eserv.getAllEvents();
            if (events.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT); // Return 204 if no events found
            }
            return new ResponseEntity<>(events, HttpStatus.OK); // Return 200 OK with events
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR); // Return 500 for errors
        }
    }

    // Update event
    @PutMapping("/putEvent/{id}")
    public ResponseEntity<EventEntity> putEvent(@PathVariable("id") int id, @RequestBody EventEntity newEventDetails) {
        try {
            EventEntity updatedEvent = eserv.putEvent(id, newEventDetails);
            if (updatedEvent == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Return 404 if event not found
            }
            return new ResponseEntity<>(updatedEvent, HttpStatus.OK); // Return 200 OK with updated event
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Delete event
    @DeleteMapping("/deleteEvent/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable("id") int id) {
        try {
            String result = eserv.deleteEvent(id);
            if ("Not Found".equals(result)) {
                return new ResponseEntity<>("Event not found", HttpStatus.NOT_FOUND); // Return 404 if event not found
            }
            return new ResponseEntity<>("Event deleted successfully", HttpStatus.OK); // Return 200 OK
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred", HttpStatus.INTERNAL_SERVER_ERROR); // Return 500 if error
        }
    }
    
    @PostMapping("/register/{eventId}")
    public ResponseEntity<String> registerForEvent(
        @PathVariable int eventId,
        @RequestBody Map<String, String> requestBody) {

        String username = requestBody.get("username");

        if (username == null || username.isEmpty()) {
            return new ResponseEntity<>("Username is required", HttpStatus.BAD_REQUEST);
        }

        try {
            return eserv.registerStudentToEvent(eventId, username);
        } catch (Exception e) {
            return new ResponseEntity<>("Error registering for event", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get joined events by username
    @GetMapping("/joined/{username}")
    public ResponseEntity<List<EventEntity>> getJoinedEvents(@PathVariable String username) {
        try {
            List<EventEntity> events = eserv.getJoinedEvents(username);
            if (events.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(events, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Leave an event
    @PostMapping("/leave/{eventId}")
    public ResponseEntity<String> leaveEvent(
        @PathVariable int eventId,
        @RequestBody Map<String, String> requestBody) {

        String username = requestBody.get("username");

        if (username == null || username.isEmpty()) {
            return new ResponseEntity<>("Username is required", HttpStatus.BAD_REQUEST);
        }

        try {
            return eserv.leaveEvent(eventId, username);
        } catch (Exception e) {
            return new ResponseEntity<>("Error leaving event", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
