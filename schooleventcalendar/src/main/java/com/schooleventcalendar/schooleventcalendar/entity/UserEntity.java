package com.schooleventcalendar.schooleventcalendar.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Version;

@Entity
@Table(name = "USER")
public class UserEntity {
    
    public enum UserType {
        S, // Student
        E  // EventManager
    }
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;
    
    @Version  
    @Column(name = "version")
    private Integer version;
    
    @Column(name = "username")
    private String username;
    
    @Column(name = "password")
    private String password;
    
    @Column(name = "firstname")
    private String firstname;
    
    @Column(name = "middlename")
    private String middlename;
    
    @Column(name = "lastname")
    private String lastname;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "type_user", nullable = false, length = 1)
    private UserType typeUser;
    
    // Default constructor
    public UserEntity() {
        super();
    }
    
    // Parameterized constructor
    public UserEntity(int userId, String username, String password, String firstname, 
                      String middlename, String lastname, UserType typeUser) {
        super();
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.middlename = middlename;
        this.lastname = lastname;
        this.typeUser = typeUser;
    }
    
    // Getters and Setters
    public int getUserId() {
        return userId;
    }
    
    public void setUserId(int userId) {
        this.userId = userId;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getFirstname() {
        return firstname;
    }
    
    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }
    
    public String getMiddlename() {
        return middlename;
    }
    
    public void setMiddlename(String middlename) {
        this.middlename = middlename;
    }
    
    public String getLastname() {
        return lastname;
    }
    
    public void setLastname(String lastname) {
        this.lastname = lastname;
    }
    
    public UserType getTypeUser() {
        return typeUser;
    }
    
    public void setTypeUser(UserType typeUser) {
        this.typeUser = typeUser;
    }
}