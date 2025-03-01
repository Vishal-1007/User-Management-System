package org.managementsystem.repository;


import org.managementsystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

//Marks this interface as a Spring Data JPA repository
@Repository 
public interface UserRepository extends JpaRepository<User, Long> {

	// Method to find a user by username (returns an Optional to handle null cases)
    Optional<User> findByUsername(String username);

 // Method to find a user by email (returns an Optional to handle null cases)
    Optional<User> findByEmail(String email);
}
