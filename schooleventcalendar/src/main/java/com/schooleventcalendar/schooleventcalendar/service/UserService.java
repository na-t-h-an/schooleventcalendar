package com.schooleventcalendar.schooleventcalendar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.schooleventcalendar.schooleventcalendar.entity.UserEntity;
import com.schooleventcalendar.schooleventcalendar.entity.UserEntity.UserType;
import com.schooleventcalendar.schooleventcalendar.repository.UserRepository;
import com.schooleventcalendar.schooleventcalendar.exception.NameErrorResponse;
import com.schooleventcalendar.schooleventcalendar.exception.NameNotFoundException;

@Service
public class UserService {

    @Autowired
    private UserRepository urepo;

    public UserService() {
        super();
    }

    // Create user
    public UserEntity postUserRecord(UserEntity user) {
        return urepo.save(user);
    }

    // Get all users
    public List<UserEntity> getAllUsers() {
        return urepo.findAll();
    }

    // Update user
    public UserEntity putUser(int userId, UserEntity newUserDetails) {
        UserEntity existingUser = urepo.findById(userId)
                .orElseThrow(() -> new NameNotFoundException("User " + userId + " does not exist!"));

        existingUser.setUsername(newUserDetails.getUsername());
        existingUser.setPassword(newUserDetails.getPassword());
        existingUser.setFirstname(newUserDetails.getFirstname());
        existingUser.setMiddlename(newUserDetails.getMiddlename());
        existingUser.setLastname(newUserDetails.getLastname());
        existingUser.setTypeUser(newUserDetails.getTypeUser());

        return urepo.save(existingUser);
    }

    // Delete user
    public String deleteUser(int userId) {
        if (urepo.existsById(userId)) {
            urepo.deleteById(userId);
            return "User " + userId + " is successfully deleted!";
        } else {
            return "User " + userId + " does not exist!";
        }
    }

    // Login authentication
    public ResponseEntity<?> authenticateUser(String username, String password) {
        UserEntity user = urepo.findByUsernameAndPassword(username, password);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

    // Get users by type (E = EventManager, S = Student)
    public List<UserEntity> getUsersByType(String type) {
        try {
            System.out.println("Received user type: [" + type + "]");
            UserType userType = UserType.valueOf(type.trim().toUpperCase());
            return urepo.findByTypeUser(userType);
        } catch (IllegalArgumentException e) {
            System.err.println("Invalid user type passed to service: " + type);
            throw new NameNotFoundException("Invalid user type: " + type);
        }
    }

    // Get user by ID
    public UserEntity getUserById(int id) {
        return urepo.findById(id).orElse(null);
    }

    // Exception for NameNotFound
    @ExceptionHandler
    public ResponseEntity<NameErrorResponse> handleException(NameNotFoundException ex) {
        NameErrorResponse error = new NameErrorResponse();
        error.setStatus(HttpStatus.NOT_FOUND.value());
        error.setMessage(ex.getMessage());
        error.setTimestamp(System.currentTimeMillis());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    // Generic exception handler
    @ExceptionHandler
    public ResponseEntity<NameErrorResponse> handleException(Exception ex) {
        NameErrorResponse error = new NameErrorResponse();
        error.setStatus(HttpStatus.BAD_REQUEST.value());
        error.setMessage(ex.getMessage());
        error.setTimestamp(System.currentTimeMillis());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}
