package com.paw.pynterest.entity.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.*;

@Data
@Entity(name="Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @NotNull
    @Column(unique = true, length = 100)
    private String email;

    @NotNull
    @Column(length = 100, unique = true)
    private String username;

    @NotNull
    @Column(length = 100)
    private String fullname;

    @NotNull
    private String password;

    private boolean admin;

    @Temporal(TemporalType.DATE)
    private Date birthDate;

    @Column(length = 500)
    private String description;

    String resetToken;

    @Lob
    private byte[] profilePicture;

    @ManyToMany(cascade = {CascadeType.ALL}, fetch = FetchType.LAZY)
    @JoinTable(
            name = "followings",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "follower_id")
    )
    private Set<User> followings = new HashSet<>();

    public void followUser(User user)
    {
        followings.add(user);
    }
}
