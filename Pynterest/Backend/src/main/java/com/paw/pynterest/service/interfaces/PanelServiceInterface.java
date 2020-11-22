package com.paw.pynterest.service.interfaces;

import com.paw.pynterest.boundry.dto.WritePanelDTO;
import com.paw.pynterest.entity.model.Panel;

public interface PanelServiceInterface {
    Long addPanel(WritePanelDTO newPanel);
    void deletePanel(Long panelId);
}
