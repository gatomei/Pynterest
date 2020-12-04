package com.paw.pynterest.entity.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
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

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    private Set<Board> boards = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "interests",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<Category> interests = new HashSet<>();
}
