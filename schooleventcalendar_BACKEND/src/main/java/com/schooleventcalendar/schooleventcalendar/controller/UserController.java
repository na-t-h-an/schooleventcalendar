package com.schooleventcalendar.schooleventcalendar.controller;

import java.util.List;
import java.util.Map; // ✅ Add this to fix "cannot find symbol: Map"

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.schooleventcalendar.schooleventcalendar.entity.UserEntity;
import com.schooleventcalendar.schooleventcalendar.service.UserService;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    // Create a new user
    @PostMapping("/postusers")
    public ResponseEntity<UserEntity> createUser(@RequestBody UserEntity user) {
        try {
            UserEntity savedUser = userService.postUserRecord(user);
            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Retrieve all users or filter by type
    @GetMapping("/getusers")
    public ResponseEntity<List<UserEntity>> getUsers(@RequestParam(required = false) String type) {
        try {
            List<UserEntity> users = (type != null && !type.isEmpty()) ?
                userService.getUsersByType(type) :
                userService.getAllUsers();
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update an existing user by ID
    @PutMapping("/updateusers/{id}")
    public ResponseEntity<UserEntity> updateUser(@PathVariable("id") int id, @RequestBody UserEntity user) {
        try {
            UserEntity updatedUser = userService.putUser(id, user);
            if (updatedUser != null) {
                return new ResponseEntity<>(updatedUser, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Delete a user by ID
    @DeleteMapping("/deleteusers/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") int id) {
        try {
            String result = userService.deleteUser(id);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return new ResponseEntity<>("Error deleting user: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Authenticate user credentials
    @PostMapping("/users/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");
        return userService.authenticateUser(username, password);
    }
}
