package com.paw.pynterest.entity.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(
        name = "followings",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_user_id_following_id",
                columnNames = {"user_id", "following_id"}
        )
)
public class Following {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    public User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "following_id")
    public User followingUser;
}
