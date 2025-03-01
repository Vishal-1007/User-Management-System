package org.managementsystem.service;

import org.managementsystem.entity.User;
import org.managementsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

// Marks this class as a service component in Spring
@Service
public class UserService implements UserDetailsService {  

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Constructor-based dependency injection
    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Adds a new user with an encrypted password
    public User addUser(User user) {
        // Check if the username already exists
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists.");
        }

        // Check if the email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists.");
        }

        // Encrypt and set the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    // Retrieves all users from the database
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Retrieves a user by ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Searches users based on multiple parameters
    public List<User> searchUsers(String username, String firstName, String lastName, String email) {
        return userRepository.findAll().stream()
                .filter(user -> (username == null || user.getUsername().equalsIgnoreCase(username))
                        && (firstName == null || user.getFirstName().equalsIgnoreCase(firstName))
                        && (lastName == null || user.getLastName().equalsIgnoreCase(lastName))
                        && (email == null || user.getEmail().equalsIgnoreCase(email)))
                .toList();
    }

    // Loads user details for authentication (used by Spring Security)
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Fetch user from the database by username
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        // Build and return the UserDetails object
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .roles("USER") // Modify roles as per your application's role management
                .build();
    }
}
