package com.paw.pynterest.service.implementation;

import com.paw.pynterest.boundry.dto.ReadPhotoDTO;
import com.paw.pynterest.boundry.dto.WritePhotoDTO;
import com.paw.pynterest.boundry.exceptions.DataIntegrityViolationException;
import com.paw.pynterest.boundry.exceptions.DeleteFileException;
import com.paw.pynterest.boundry.exceptions.NotFoundException;
import com.paw.pynterest.boundry.exceptions.ServerErrorException;
import com.paw.pynterest.entity.model.Category;
import com.paw.pynterest.entity.model.Photo;
import com.paw.pynterest.entity.model.User;
import com.paw.pynterest.entity.repository.CategoryRepository;
import com.paw.pynterest.entity.repository.PhotoRepository;
import com.paw.pynterest.entity.repository.UserRepository;
import com.paw.pynterest.service.interfaces.PhotoServiceInterface;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.apache.commons.lang.RandomStringUtils;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PhotoServiceImpl implements PhotoServiceInterface {

    private final PhotoRepository photoRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public PhotoServiceImpl(PhotoRepository photoRepository, ModelMapper modelMapper, CategoryRepository categoryRepository, UserRepository userRepository){
        this.modelMapper = modelMapper;
        this.photoRepository = photoRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void deletePhoto(Long photoId){
        try{
            String photoPath = photoRepository.findById(photoId).get().getPath();
            File photoToDelete = new File(photoPath);
            if (!photoToDelete.delete()) {
                throw new DeleteFileException("Photo could not be deleted!");
            }
            photoRepository.deleteById(photoId);
        }
        catch (Exception e){
            throw new NotFoundException("Photo not found!");
        }
    }

    @Override
    public Long addPhoto(WritePhotoDTO writePhotoDTO, Long userId){
        Photo photo = modelMapper.map(writePhotoDTO,Photo.class);
        Optional<Category> categorySelected = categoryRepository.findByName(writePhotoDTO.getCategoryName());
        if(!categorySelected.isPresent()) {
            throw new DataIntegrityViolationException("Selected category does not exists! Please add that category first than try again!");
        }

        Optional<User> user = userRepository.findById(userId);
        if(!user.isPresent()){
            throw new DataIntegrityViolationException("User id is not in database!");
        }
        photo.setUser(user.get());
        photo.getCategories().add(categorySelected.get());
        photo.setPath("Categories/"+categorySelected.get().getName() + "/" + generatePhotoFileName("jpg"));

        try{
            convertAndSavaPhoto(writePhotoDTO.getPictureData(),photo.getPath());
            Photo savedPhoto = photoRepository.saveAndFlush(photo);
            return savedPhoto.getPhotoId();
        }
        catch (IOException e){
            throw new DataIntegrityViolationException("Photo could not be saved! Error: " + e.toString());
        }
        catch (org.springframework.dao.DataIntegrityViolationException dataIntegrityViolationException) {
            throw new DataIntegrityViolationException("This user has already a board with this title!");
        }
        catch (Exception e)
        {
            throw new ServerErrorException("Couldn't save board!");
        }
    }

    @Override
    public ReadPhotoDTO getPhotoById(Long photoId){
        Optional<Photo> photoFromDb = photoRepository.findById(photoId);
        if(!photoFromDb.isPresent()) {
            throw new NotFoundException("Viata e minunata....dar poza cu id-ul" + photoId.toString() + " nu exista!");
        }
        ReadPhotoDTO photoToReturn= modelMapper.map(photoFromDb.get(),ReadPhotoDTO.class);

        photoToReturn.setUserId(photoFromDb.get().getUser().getUserId());
        photoToReturn.setCategoryId(photoFromDb.get().getCategories().iterator().next().getCategoryId());
        photoToReturn.setPictureData(getPhotoFromFile(photoFromDb.get().getPath()));

        return photoToReturn;
    }

    @Override
    public List<ReadPhotoDTO> getAllPhotoByUserName(String userName){
        List<ReadPhotoDTO> photoListToReturn = new ArrayList<ReadPhotoDTO>();
        User user = userRepository.findByUsername(userName);
        if(user!=null)
        {
            List<Photo> photoListFromDb = photoRepository.findAllByUser(user);
            photoListFromDb.forEach(photo -> {
                ReadPhotoDTO tempPhoto = modelMapper.map(photo, ReadPhotoDTO.class);

                tempPhoto.setUserId(photo.getUser().getUserId());
                tempPhoto.setCategoryId(photo.getCategories().iterator().next().getCategoryId());
                tempPhoto.setPictureData(getPhotoFromFile(photo.getPath()));

                photoListToReturn.add(tempPhoto);
            });
        }
        else
        {
            throw new NotFoundException("User with username " + userName + " does not exist!");
        }

        return photoListToReturn;
    }

    @Override
    public Photo findById(Long photoId) {
        Optional<Photo> photo = photoRepository.findById(photoId);
        if (!photo.isPresent())
            throw new NotFoundException("Photo not found!");
        return photo.get();
    }

    private static void convertAndSavaPhoto(byte[] profilePicture,String path) throws IOException {
        ByteArrayInputStream bis = new ByteArrayInputStream(profilePicture);
        BufferedImage bImage = ImageIO.read(bis);
        ImageIO.write(bImage, "jpg", new File(path) );
    }

    private static String generatePhotoFileName(String fileExtension) {
        return String.format("%s.%s", RandomStringUtils.randomAlphanumeric(8), fileExtension);
    }

    public static byte[] getPhotoFromFile(String path){
        File file = new File(path);
        if (!file.exists())
            return new byte[] {};
        try {
            BufferedImage image = ImageIO.read(file);
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            ImageIO.write(image, "jpg",byteArrayOutputStream);
            return byteArrayOutputStream.toByteArray();
        }
        catch (IOException e)
        {
            return new byte[]{};
        }
    }
}
