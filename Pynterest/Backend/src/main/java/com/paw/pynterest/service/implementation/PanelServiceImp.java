package com.paw.pynterest.service.implementation;

import com.paw.pynterest.boundry.dto.WritePanelDTO;
import com.paw.pynterest.boundry.exceptions.NotFoundException;
import com.paw.pynterest.boundry.exceptions.ServerErrorException;
import com.paw.pynterest.boundry.exceptions.DataIntegrityViolationException;
import com.paw.pynterest.entity.model.Panel;
import com.paw.pynterest.entity.model.User;
import com.paw.pynterest.entity.repository.PanelRepository;
import com.paw.pynterest.entity.repository.UserRepository;
import com.paw.pynterest.service.interfaces.PanelServiceInterface;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PanelServiceImp implements PanelServiceInterface {


    private final PanelRepository panelRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;

    public PanelServiceImp(PanelRepository panelRepository, ModelMapper modelMapper, UserRepository userRepository) {
        this.panelRepository = panelRepository;
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
    }

    @Override
    public Long addPanel(WritePanelDTO newPanel){
        Panel panel = modelMapper.map(newPanel, Panel.class);
        Optional<User> user = userRepository.findById(newPanel.getUserId());
        if(!user.isPresent())
            throw new DataIntegrityViolationException("User id is not in database!");
        panel.setUser(user.get());
        try{
            Panel savedPanel = panelRepository.saveAndFlush(panel);
            return savedPanel.getPanelId();
        }
        catch (org.springframework.dao.DataIntegrityViolationException dataIntegrityViolationException) {
            throw new DataIntegrityViolationException("This user has already a panel with this title!");
        }
        catch (Exception e)
        {
            throw new ServerErrorException("Couldn't save panel!");
        }

    }

    @Override
    public void deletePanel(Long panelId) {
        try{
            panelRepository.deleteById(panelId);
        }catch (Exception e)
        {
            throw new NotFoundException("Panel not found!");
        }
    }
}
