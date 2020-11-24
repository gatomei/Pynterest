package com.paw.pynterest.entity.model;

import lombok.Data;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
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
    @NotNull
    @JoinColumn(
            name = "user_id",
            foreignKey = @ForeignKey(name = "fk_boards_user_id")
    )
    private User user;
}
