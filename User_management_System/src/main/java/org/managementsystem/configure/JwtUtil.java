package org.managementsystem.configure;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Component;

import java.util.Date;
import javax.crypto.SecretKey;

@Component
public class JwtUtil {

    // Secret key used for signing the JWT token
    private final SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    
    // Stores the claims extracted from a token
    public Claims claims;

    // Generates a JWT token for a given username
    public String generateToken(String userName) {
        return Jwts.builder()
                .setSubject(userName) // Sets the username as the subject of the token
                .setIssuedAt(new Date()) // Sets the current time as the issue time
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // Expiry time: 1 hour
                .signWith(secretKey) // Signs the token with the secret key
                .compact(); // Builds the final token string
    }

    // Validates the JWT token by checking the username and expiration time
    public boolean validateToken(String token, String userName) {
        String tokenUsername = claims.getSubject(); // Extracts username from token
        return (userName.equals(tokenUsername) && !isTokenExpired()); // Checks if the username matches and token is not expired
    }

    // Extracts the username from the given JWT token
    public String extractUsername(String token) {
        claims = getClaims(token); // Retrieves claims from the token
        return claims.getSubject(); // Returns the subject (username)
    }

    // Retrieves claims (payload data) from the given JWT token
    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey) // Uses the secret key for verification
                .build()
                .parseClaimsJws(token) // Parses the JWT and extracts claims
                .getBody();
    }

    // Checks if the token is expired
    private boolean isTokenExpired() {
        return claims.getExpiration().before(new Date()); // Compares token expiration with current date
    }
}
