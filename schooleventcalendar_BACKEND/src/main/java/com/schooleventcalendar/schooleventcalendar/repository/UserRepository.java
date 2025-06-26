package com.schooleventcalendar.schooleventcalendar.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.schooleventcalendar.schooleventcalendar.entity.UserEntity;
import com.schooleventcalendar.schooleventcalendar.entity.UserEntity.UserType;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
	
    // Find user by username
	public UserEntity findByUsername(String username);
    
    // Find user by last name
    public UserEntity findByLastname(String lastname);
    
    // Find users by type (Student or EventManager)
    public List<UserEntity> findByTypeUser(UserType typeUser);
    
    // Find user by username and password (for authentication)
    public UserEntity findByUsernameAndPassword(String username, String password);
    
    // Find users by first name
    public List<UserEntity> findByFirstname(String firstname);
    
    // Find users by first name and last name
    public List<UserEntity> findByFirstnameAndLastname(String firstname, String lastname);
    
}