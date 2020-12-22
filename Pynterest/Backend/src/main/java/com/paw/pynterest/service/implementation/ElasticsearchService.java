package com.paw.pynterest.service.implementation;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.paw.pynterest.boundry.dto.ElasticsearchPhotoDTO;
import com.paw.pynterest.entity.model.Photo;
import com.paw.pynterest.service.interfaces.ElasticsearchServiceInterface;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

@Service
public class ElasticsearchService implements ElasticsearchServiceInterface {

    private final ModelMapper modelMapper;

    @Value("${searchengine.host}")
    private String host;

    @Value("${searchengine.port}")
    private String port;

    public ElasticsearchService(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public void indexPhoto(Photo photo) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            ElasticsearchPhotoDTO photoDTO = modelMapper.map(photo, ElasticsearchPhotoDTO.class);
            String jsonPhoto = mapper.writeValueAsString(photoDTO);
            URL url = new URL(String.format("http://%s:%s/api/photos", host, port));
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setDoOutput(true);
            try (DataOutputStream os = new DataOutputStream(connection.getOutputStream())) {
                os.writeBytes(jsonPhoto);
                os.flush();
            }
            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_CREATED)
                System.out.println("Photo indexed!");
        } catch (Exception e) {
            System.out.println("Photo wasn't indexed!");
        }
    }

    @Override
    public void deletePhoto(Long photoId) {
        try {
            URL url = new URL(String.format("http://%s:%s/api/photos/%d", host, port, photoId));
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("DELETE");
            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK)
                System.out.println("Photo deleted!");
        } catch (Exception e) {
            System.out.println("Photo wasn't deleted!");
        }
    }
}
