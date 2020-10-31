package com.paw.pynterest.jwt;

import com.paw.pynterest.entity.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtValidator {

    @Value("${jwt.secret-key}")
    private final String secretKey;

    public JwtValidator(){
        secretKey = "";
    }
    public User validate(String token) {

        User user = null;
        try {
            Claims body = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody();

            user = new User();

            user.setUsername(body.getSubject());
            user.setUserId(Long.parseLong(body.get("userId").toString()));
            user.setEmail(body.get("email").toString());
            user.setFullname(body.get("fullname").toString());
            user.setPassword(body.get("password").toString());
            user.setAdmin(Boolean.parseBoolean(body.get("admin").toString()));
            //user.setBirthDate(new SimpleDateFormat("dd-MM-yyyy").parse(body.get("birthDate").toString()));
            user.setDescription(body.get("description").toString());
        }
        catch (Exception exception) {
            System.out.println(exception);
        }
        return user;
    }
}
