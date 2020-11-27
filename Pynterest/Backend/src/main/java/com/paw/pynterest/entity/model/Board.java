package com.paw.pynterest.entity.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table( name = "boards",
        uniqueConstraints = @UniqueConstraint(
            name = "uk_title_user_id",
            columnNames = {
                "title",
                "user_id"
            }
        )
)
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long boardId;

    @NotNull
    @Column(length = 300, name = "title")
    @Type(type = "nstring")
    private String title;

    @NotNull
    @Column(name = "private_board")
    private Boolean privateBoard;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "user_id",
            foreignKey = @ForeignKey(name = "fk_boards_user_id")
    )
    private User user;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "board_photo",
            joinColumns = @JoinColumn(name = "board_id"),
            inverseJoinColumns = @JoinColumn(name = "photo_id")
    )
    private Set<Photo> photos = new HashSet<>();
}
