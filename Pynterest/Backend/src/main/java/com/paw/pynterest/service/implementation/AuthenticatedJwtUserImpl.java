package com.paw.pynterest.service.implementation;

import com.paw.pynterest.entity.model.User;
import com.paw.pynterest.jwt.model.JwtUserDetails;
import com.paw.pynterest.service.interfaces.AuthenticatedJwtUserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticatedJwtUserImpl implements AuthenticatedJwtUserService {

    @Override
    public JwtUserDetails getAuthenticatedJwtUserDetails() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if(auth.isAuthenticated()) {
            JwtUserDetails jwtUserDetails = (JwtUserDetails) auth.getPrincipal();

            return jwtUserDetails;
        }
        else{
            return null;
        }
    }
}
