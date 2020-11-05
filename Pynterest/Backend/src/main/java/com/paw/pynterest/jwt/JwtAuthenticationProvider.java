package com.paw.pynterest.jwt;

import com.paw.pynterest.jwt.model.JwtAuthenticationToken;
import com.paw.pynterest.boundry.exceptions.IncorrectTokenException;
import com.paw.pynterest.jwt.model.JwtUserDetails;
import com.paw.pynterest.entity.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationProvider extends AbstractUserDetailsAuthenticationProvider {

    @Autowired
    private JwtValidator validator;

    @Override
    protected void additionalAuthenticationChecks(UserDetails userDetails, UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken) throws AuthenticationException { }

    @Override
    protected UserDetails retrieveUser(String username, UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken) throws AuthenticationException {


        JwtAuthenticationToken jwtAuthenticationToken = (JwtAuthenticationToken) usernamePasswordAuthenticationToken;
        String token = jwtAuthenticationToken.getToken();

        User user = validator.validate(token);

        if (user == null) {
            throw new IncorrectTokenException("JWT Token is incorrect");
        }

        return new JwtUserDetails(user.getUserId(),
                                  user.getEmail(),
                                  user.getUsername(),
                                  user.getFullname(),
                                  user.getPassword(),
                                  user.isAdmin(),
                                  user.getBirthDate(),
                                  user.getDescription(),
                                  token);
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return (JwtAuthenticationToken.class.isAssignableFrom(aClass));
    }
}
