package com.schooleventcalendar.schooleventcalendar.exception;

public class NameErrorResponse {
    private int status;
    private String message;
    private long timestamp;
    
    public NameErrorResponse() {}
    
    public NameErrorResponse(int status, String message, long timestamp) {
        this.status = status;
        this.message = message;
        this.timestamp = timestamp;
    }
    
    // Getters and Setters
    public int getStatus() {
        return status;
    }
    
    public void setStatus(int status) {
        this.status = status;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public long getTimestamp() {
        return timestamp;
    }
    
    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }
}