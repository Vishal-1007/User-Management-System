package org.managementsystem.controller;

import java.util.ArrayList;
import java.util.List;

import org.managementsystem.dto.UserDto;
import org.managementsystem.entity.User;
import org.managementsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Marks this class as a REST controller, handling HTTP requests
@RestController

// Defines the base URL for all endpoints in this controller
@RequestMapping("/users")

// Enables Cross-Origin Resource Sharing (CORS) for frontend communication
@CrossOrigin(origins = "http://localhost:3001")

public class UserController {

    // Injects UserService dependency
    @Autowired
    
    private UserService usersService;

    // Endpoint to add a new user
    @PostMapping("/add")
    
    public ResponseEntity<?> addUser(@RequestBody User user) {
        try {
        	
            // Saves the new user
            User savedUser = usersService.addUser(user);

            // Converts the saved User entity into a UserDto object
            UserDto userDTO = new UserDto();
            userDTO.setId(savedUser.getId());
            userDTO.setUsername(savedUser.getUsername());
            userDTO.setFirstName(savedUser.getFirstName());
            userDTO.setLastName(savedUser.getLastName());
            userDTO.setEmail(savedUser.getEmail());

            // Returns the created user as a response
            return ResponseEntity.ok().body(userDTO);
        } catch (RuntimeException e) {
        	
            // Returns an error message if user creation fails
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Endpoint to search users based on multiple parameters
    @PostMapping("/search")
    
    public ResponseEntity<List<UserDto>> searchUsers(@RequestBody User searchCriteria) {
        // Searches for users using the provided criteria
    	
        List<User> usersList = usersService.searchUsers(searchCriteria.getUsername(),
                searchCriteria.getFirstName(), searchCriteria.getLastName(),
                searchCriteria.getEmail());

        // Converts the list of User entities into UserDto objects
        List<UserDto> usersDTOList = new ArrayList<>();
        for (User user : usersList) {
            UserDto userDTO = new UserDto();
            userDTO.setId(user.getId());
            userDTO.setUsername(user.getUsername());
            userDTO.setFirstName(user.getFirstName());
            userDTO.setLastName(user.getLastName());
            userDTO.setEmail(user.getEmail());
            usersDTOList.add(userDTO);
        }

        // Returns the list of matching users
        return ResponseEntity.ok().body(usersDTOList);
    }
}
