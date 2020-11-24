package com.paw.pynterest.entity.model;

import lombok.Data;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity(name = "Categories")
public class Category {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long categoryId;


    @NotNull
    @Column(unique = true, length = 50, name = "name")
    @Type(type = "nstring")
    private String name;

    @ManyToMany(mappedBy = "categories")
    private Set<Photo> photos = new HashSet<>();
}
