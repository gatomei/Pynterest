package com.paw.pynterest.entity.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity(name = "Photos")
public class Photo {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "photo_id")
    private Long photoId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "user_id",
            foreignKey = @ForeignKey(name = "fk_photos_user_id")
    )
    private User user;

    @NotNull
    @Column(length = 100, name = "title")
    @Type(type = "nstring")
    private String title;

    @Column(length = 500, name = "description")
    @Type(type = "nstring")
    private String description;

    @NotNull
    @Column(length = 100, name = "path")
    @Type(type = "nstring")
    private String path;


    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "Photo_Categories",
            joinColumns = @JoinColumn(name = "photo_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<Category> categories = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "board_photo",
            joinColumns = @JoinColumn(name = "photo_id"),
            inverseJoinColumns = @JoinColumn(name = "board_id")
    )
    private Set<Board> boards = new HashSet<>();
}
