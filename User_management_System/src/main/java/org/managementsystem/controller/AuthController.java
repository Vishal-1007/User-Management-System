package org.managementsystem.controller;

import org.managementsystem.configure.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


 //Controller class for handling authentication-related endpoints.
@RestController

@RequestMapping("/api/auth") // Base URL for authentication-related requests

public class AuthController {

    private final JwtUtil jwtUtil;

    // Constructor-based dependency injection for JwtUtil
    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    // Endpoint for user login and token generation
    @PostMapping("/login")
    
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
    	
        // Extracts username and password from request body
        String userName = credentials.get("username");
        String password = credentials.get("password");

        // Hardcoded username & password for authentication (should be replaced with database verification)
        if ("admin".equals(userName) && "password".equals(password)) {
        	
            // Generates a JWT token for the authenticated user
            String token = jwtUtil.generateToken(userName);

            // Prepares the response containing the token
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return ResponseEntity.ok(response);
            
        } else {
            // Returns 401 Unauthorized if authentication fails
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }
}
