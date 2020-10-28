package com.paw.pynterest.entity.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import java.util.Date;

@Data
@Entity(name="Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @NotNull
    @Email(message = "Email should be valid")
    @Column(unique = true, length = 100)
    private String email;

    @NotNull
    @Column(length = 100, unique = true)
    private String username;

    @NotNull
    @Column(length = 100)
    private String fullname;

    @NotNull
    @Column(length = 50)
    private String password;

    @NotNull
    private boolean admin;

    @Past(message = "Birthdate should be in the past")
    @Temporal(TemporalType.DATE)
    private Date birthDate;

    @Column(length = 500)
    private String description;
}
