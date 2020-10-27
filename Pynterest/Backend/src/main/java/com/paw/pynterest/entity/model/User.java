package com.paw.pynterest.entity.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import java.sql.Date;

@Data
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @NotNull
    @Email(message = "Email should be valid")
    private String email;

    @NotNull
    private String username;

    @NotNull
    private String fullname;

    @NotNull
    private String password;

    @NotNull
    private boolean admin;

    @Past
    private Date birthDate;

    private String description;
}
