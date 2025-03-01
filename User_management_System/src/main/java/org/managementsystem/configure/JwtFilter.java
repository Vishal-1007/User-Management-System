package org.managementsystem.configure;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


 //JWT Filter to validate JSON Web Tokens (JWT) for each incoming request.
  //This ensures that only authenticated users can access secured endpoints.
 
@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    // Constructor-based dependency injection for JwtUtil
    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    
     //Filters incoming requests to validate JWT tokens.
     //If the token is invalid or missing, the request is denied.
     
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // Allow login endpoint to be accessed without token verification
        if (request.getRequestURI().equals("/api/auth/login")) {
            filterChain.doFilter(request, response);
            return; 
        }

        // Extracts the "Authorization" header from the request
        String authorizationHeader = request.getHeader("Authorization");

        // Checks if the header contains a Bearer token
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7); // Extracts the token after "Bearer "
            String userName = jwtUtil.extractUsername(token); // Extracts username from token

            // Validates the extracted token
            if (!jwtUtil.validateToken(token, userName)) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Invalid or expired JWT token.");
                return;
            }
        } else {
            // Rejects the request if the token is missing
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("JWT token missing.");
            return;
        }

        // Passes the request to the next filter in the chain
        filterChain.doFilter(request, response);
    }
}
