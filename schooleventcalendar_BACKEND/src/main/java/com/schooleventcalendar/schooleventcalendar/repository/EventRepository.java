package com.schooleventcalendar.schooleventcalendar.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.schooleventcalendar.schooleventcalendar.entity.EventEntity;
import com.schooleventcalendar.schooleventcalendar.entity.UserEntity;

@Repository
public interface EventRepository extends JpaRepository<EventEntity, Integer> {
	public EventEntity findByEventName(String eventName);
	List<EventEntity> findByParticipantsContaining(UserEntity user);
    List<EventEntity> findByParticipantsContains(UserEntity user);
}
