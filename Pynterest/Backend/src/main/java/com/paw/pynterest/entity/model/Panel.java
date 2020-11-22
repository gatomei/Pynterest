package com.paw.pynterest.entity.model;

import lombok.Data;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
@Table( name = "panels",
        uniqueConstraints = @UniqueConstraint(
            name = "uk_title_user_id",
            columnNames = {
                "title",
                "user_id"
            }
    )
)
public class Panel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "panel_id")
    private Long panelId;

    @NotNull
    @Column(length = 300, name = "title")
    @Type(type = "nstring")
    private String title;

    @NotNull
    @Column(name = "private_panel")
    private Boolean privatePanel;

    @ManyToOne(fetch = FetchType.LAZY)
    @NotNull
    @JoinColumn(
            name = "user_id",
            foreignKey = @ForeignKey(name = "fk_panels_user_id")
    )
    private User user;
}
