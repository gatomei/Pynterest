package com.paw.pynterest.entity.repository;

import com.paw.pynterest.entity.model.Panel;
import com.paw.pynterest.entity.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PanelRepository extends JpaRepository<Panel, Long> {
}
