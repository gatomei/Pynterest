package com.paw.pynterest.service.interfaces;

import com.paw.pynterest.entity.model.User;
import com.paw.pynterest.jwt.model.JwtUserDetails;

public interface AuthenticatedJwtUserService {

    JwtUserDetails getAuthenticatedJwtUserDetails();

}
