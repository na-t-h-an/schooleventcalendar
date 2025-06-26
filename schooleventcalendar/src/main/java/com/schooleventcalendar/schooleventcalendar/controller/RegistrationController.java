package com.schooleventcalendar.schooleventcalendar.controller;

import com.schooleventcalendar.schooleventcalendar.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:5173")
 // change this to match vite react
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @PostMapping("/register/{eventId}")
    public String registerStudent(@PathVariable int eventId, @RequestBody Map<String, Object> payload) {
        int studentId = (int) payload.get("studentId");
        return registrationService.registerStudent(eventId, studentId);
    }
}
