package com.schooleventcalendar.schooleventcalendar.exception;

public class NameNotFoundException extends RuntimeException {
    
    public NameNotFoundException() {
        super();
    }
    
    public NameNotFoundException(String message) {
        super(message);
    }
    
    public NameNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}