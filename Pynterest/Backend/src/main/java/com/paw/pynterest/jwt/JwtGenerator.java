package com.paw.pynterest.jwt;

import com.paw.pynterest.entity.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtGenerator {

    @Value("${jwt.secret-key}")
    private final String secretKey;

    public JwtGenerator(){
        secretKey = "";
    }

    public String generate(User user) {

        Claims claims = Jwts.claims().setSubject(user.getUsername());

        claims.put("userId", user.getUserId());
        claims.put("email", user.getEmail());
        claims.put("fullname", user.getFullname());
        claims.put("password", user.getPassword());
        claims.put("admin", user.isAdmin());
        claims.put("birthDate", user.getBirthDate());
        claims.put("description", user.getDescription());

        return Jwts.builder()
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }
}
