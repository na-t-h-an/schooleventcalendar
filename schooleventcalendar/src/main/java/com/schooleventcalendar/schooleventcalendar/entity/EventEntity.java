package com.schooleventcalendar.schooleventcalendar.entity;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

import java.sql.Timestamp;
import java.sql.Time;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "event")
public class EventEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "event_id")
	private int event_id;
	
	@Column(name = "eventname")
	private String eventName;
	
	@Column(name = "event_schedule")
	private LocalDate eventSchedule;
	
	@Column(name = "start_time")
	private Time startTime;
	
	@Column(name = "end_time")
	private Time endTime;
	
	@Column(name = "event_location")
	private String eventLocation;
	
	@Column(name = "event_description")
	private String eventDescription;
	
	@Column(name = "event_createdate")
	private Timestamp eventCreateDate;
	
	@Column(name = "event_isactive")
	private boolean eventIsActive;
	
	// Many-to-many relationship with UserEntity
	@ManyToMany
	@JoinTable(
		name = "event_participants",
		joinColumns = @JoinColumn(name = "event_id"),
		inverseJoinColumns = @JoinColumn(name = "user_id")
	)
	private Set<UserEntity> participants = new HashSet<>();
	
	public EventEntity() {
		super();
	}
	
	public EventEntity(int event_id, String eventName, LocalDate eventSchedule,
			Time startTime, Time endTime, String eventLocation, String eventDescription,
			Timestamp eventCreateDate, boolean eventIsActive) {
		super();
		this.event_id = event_id;
		this.eventName = eventName;
		this.eventSchedule = eventSchedule;
		this.startTime = startTime;
		this.endTime = endTime;
		this.eventLocation = eventLocation;
		this.eventDescription = eventDescription;
		this.eventCreateDate = eventCreateDate;
		this.eventIsActive = eventIsActive;
	}
	public int getEventId() {
        return event_id;
    }

    public void setEventId(int event_id) {
        this.event_id = event_id;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public LocalDate getEventSchedule() {
        return eventSchedule;
    }

    public void setEventSchedule(LocalDate eventSchedule) {
        this.eventSchedule = eventSchedule;
    }

    public Time getStartTime() {
        return startTime;
    }

    public void setStartTime(Time startTime) {
        this.startTime = startTime;
    }

    public Time getEndTime() {
        return endTime;
    }

    public void setEndTime(Time endTime) {
        this.endTime = endTime;
    }

    public String getEventLocation() {
        return eventLocation;
    }

    public void setEventLocation(String eventLocation) {
        this.eventLocation = eventLocation;
    }

    public String getEventDescription() {
        return eventDescription;
    }

    public void setEventDescription(String eventDescription) {
        this.eventDescription = eventDescription;
    }

    public Timestamp getEventCreateDate() {
        return eventCreateDate;
    }

    public void setEventCreateDate(Timestamp eventCreateDate) {
        this.eventCreateDate = eventCreateDate;
    }

    public boolean getEventIsActive() {
        return eventIsActive;
    }

    public void setEventIsActive(boolean eventIsActive) {
        this.eventIsActive = eventIsActive;
    }
    
 // Getters and setters for the participants relationship
    public Set<UserEntity> getParticipants() {
        return participants;
    }
    
    public void setParticipants(Set<UserEntity> participants) {
        this.participants = participants;
    }
}
