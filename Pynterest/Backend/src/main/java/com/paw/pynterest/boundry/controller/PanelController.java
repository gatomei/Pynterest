package com.paw.pynterest.boundry.controller;

import com.paw.pynterest.boundry.dto.WritePanelDTO;
import com.paw.pynterest.entity.model.Panel;
import com.paw.pynterest.service.implementation.PanelServiceImp;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/authorize/api/pynterest/boards")
public class PanelController {


    private final PanelServiceImp panelService;

    public PanelController(PanelServiceImp panelService) {
        this.panelService = panelService;
    }

    @PostMapping("")
    public ResponseEntity<?> addPanel(@RequestBody @Valid WritePanelDTO newBoard)
    {
        Long panelId = panelService.addPanel(newBoard);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", panelId.toString());
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    @DeleteMapping("/{panelId}")
    public ResponseEntity<?> deletePanel(@PathVariable Long panelId)
    {
        panelService.deletePanel(panelId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
