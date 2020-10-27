package com.paw.pynterest.entity.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import java.util.Date;

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

    @Past(message = "Birthdate should be in the past")
    @JsonFormat(pattern="dd-mm-yyyy")
    private Date birthDate;

    private String description;
}
