package com.paw.pynterest.services;

import com.paw.pynterest.boundry.exceptions.NotFoundException;
import com.paw.pynterest.entity.model.User;
import com.paw.pynterest.entity.repository.UserRepository;
import com.paw.pynterest.service.implementation.UserServiceImpl;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.fail;

public class UserServiceTest {

    @InjectMocks
    private UserServiceImpl userService;

    @Mock
    private UserRepository userRepository;

    private User user;

    @Before
    public void setup(){
        MockitoAnnotations.initMocks(this);
        user=buildUser();
    }

    private User buildUser(){
        User u=new User();
        u.setUserId(1L);
        u.setUsername("gatomei");
        u.setEmail("gtomei@gmail.com");
        u.setFullname("Georgiana");
        u.setPassword("parola");
        u.setAdmin(false);
        return u;
    }


    @Test
    public void  shouldReturnUserById(){

        Mockito.when(userRepository.findById(1L)).thenReturn(Optional.ofNullable(user));


       User userById = userService.findById(1L);

        Assertions.assertThat(userById).isNotNull();
        Assertions.assertThat(userById).isEqualToIgnoringNullFields(user);
    }

    @Test(expected = NotFoundException.class)
    public void  shouldReturnNotFoundExceptionOnFindById(){

        Mockito.when(userRepository.findById(2L)).thenReturn(Optional.empty());


        userService.findById(2L);
        fail();
    }

    @Test
    public void  shouldReturnUserByUsername(){

        Mockito.when(userRepository.findByUsername("gatomei")).thenReturn(user);

        User userByUsername = userService.findUserByUsername("gatomei");

        Assertions.assertThat(userByUsername).isNotNull();
        Assertions.assertThat(userByUsername).isEqualToIgnoringNullFields(user);
    }

    @Test(expected = NotFoundException.class)
    public void  shouldReturnNotFoundExceptionOnFindByUsername(){

        Mockito.when(userRepository.findByUsername("username")).thenReturn(null);

        userService.findUserByUsername("username");
        fail();
    }


    @Test
    public void shouldReturnListOfUsers(){
        User user1 = buildUser();
        List<User> users = Arrays.asList(user,user1);
        Mockito.when(userRepository.findAll()).thenReturn(users);

        List<User> allUsers = userService.findAll();

        Assertions.assertThat(allUsers).isNotNull();
        Assertions.assertThat(allUsers.size()).isEqualTo(2);
    }

    @After
    public void tearDown(){
        user = null;
    }
}
