package com.paw.pynterest.service.implementation;

import com.paw.pynterest.boundry.dto.ReadPhotoDTO;
import com.paw.pynterest.boundry.dto.WritePhotoDTO;
import com.paw.pynterest.boundry.exceptions.DataIntegrityViolationException;
import com.paw.pynterest.boundry.exceptions.DeleteFileException;
import com.paw.pynterest.boundry.exceptions.NotFoundException;
import com.paw.pynterest.boundry.exceptions.ServerErrorException;
import com.paw.pynterest.entity.model.Board;
import com.paw.pynterest.entity.model.Category;
import com.paw.pynterest.entity.model.Photo;
import com.paw.pynterest.entity.model.User;
import com.paw.pynterest.entity.repository.BoardRepository;
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
import java.sql.Timestamp;
import java.util.*;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
public class PhotoServiceImpl implements PhotoServiceInterface {

    private final PhotoRepository photoRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final BoardRepository boardRepository;

    public PhotoServiceImpl(PhotoRepository photoRepository, ModelMapper modelMapper, CategoryRepository categoryRepository, UserRepository userRepository, BoardRepository boardRepository){
        this.modelMapper = modelMapper;
        this.photoRepository = photoRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.boardRepository = boardRepository;
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
        photo.setCreationDate( new Timestamp(System.currentTimeMillis()) );

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

        photoToReturn.setUsername(photoFromDb.get().getUser().getUsername());
        photoToReturn.setCategoryId(photoFromDb.get().getCategories().iterator().next().getCategoryId());
        photoToReturn.setPictureData(getPhotoFromFile(photoFromDb.get().getPath()));

        return photoToReturn;
    }

    @Override
    public List<Photo> getAllPhotoByUserName(String userName, int photoNumber, Long lastPhotoSentId){
        boolean startAdd = false;
        List<Photo> photoListToReturn = new ArrayList<Photo>();
        User user = userRepository.findByUsername(userName);
        if(user==null) {
            throw new NotFoundException("Viata e minunata....dar user-ul cu username-ul " + userName + " nu exista");
        }
        List<Photo> allPhotoFromDb = photoRepository.findAllByUserOrderByCreationDateDesc(user);
        if(lastPhotoSentId == null){
            startAdd = true;
        }

        while(photoListToReturn.size() < photoNumber && !allPhotoFromDb.isEmpty())
        {
            if(startAdd == true)
            {
                photoListToReturn.add(allPhotoFromDb.get(0));
                allPhotoFromDb.remove(allPhotoFromDb.get(0));
            }
            else{
                if(allPhotoFromDb.get(0).getPhotoId() == lastPhotoSentId){
                    startAdd = true;
                    allPhotoFromDb.remove(allPhotoFromDb.get(0));
                }
                else
                {
                    allPhotoFromDb.remove(allPhotoFromDb.get(0));
                }
            }
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

    @Override
    public List<Photo> getPhotosForMainPage(Long userId, int photoNumber, Long lastPhotoSentId){
        int[] totalPhotos = {0};
        List<Photo> photosToReturn = new ArrayList<Photo>();
        List<List<Photo>> photosFromEachCategoriesOrderByDate = new ArrayList<List<Photo>>();
        Optional<User> user = userRepository.findById(userId);
        if(!user.isPresent()) {
            throw new NotFoundException("Viata e miiinunata, dar user-ul cu id-ul " + userId.toString() + " nu exista!");
        }
        List<Category> usersCategories = new ArrayList<>(user.get().getInterests());
        usersCategories.sort(Comparator.comparing(Category::getName));

        usersCategories.stream().forEach(c -> {
            List<Photo> photoSortedByDate = photoRepository.findAllByCategoriesContainsOrderByCreationDateDesc(c);
            photosFromEachCategoriesOrderByDate.add(photoSortedByDate);
            totalPhotos[0] = totalPhotos[0] + photoSortedByDate.size();
        });
        AtomicBoolean startAdding = new AtomicBoolean(false);
        if(lastPhotoSentId == null)
        {
            startAdding.set(true);
        }


        while(totalPhotos[0] != 0 && photosToReturn.size() < photoNumber) {
            photosFromEachCategoriesOrderByDate.forEach(c -> {
                if (!c.isEmpty() && startAdding.get() == true && photosToReturn.size() < photoNumber) {
                    photosToReturn.add(c.get(0));
                    c.remove(c.get(0));
                    totalPhotos[0]--;
                }

                if(lastPhotoSentId != null && !c.isEmpty() && startAdding.get() == false) {
                    if (c.get(0).getPhotoId() == lastPhotoSentId) {
                        startAdding.set(true);
                        c.remove(c.get(0));
                        totalPhotos[0]--;
                    }
                    else
                    {
                        c.remove(c.get(0));
                        totalPhotos[0]--;
                    }
                }
            });
        }
        return photosToReturn;
    }

    @Override
    public List<Photo> getPhotosFromBoard(String boardTitle,Long userId,int photoNumber, Long lastPhotoSentId) {
        boolean startAdd = false;
        List<Photo> photoListToReturn = new ArrayList<Photo>();
        Optional<User> user = userRepository.findById(userId);
        if(!user.isPresent()) {
            throw new NotFoundException("Viata e miiinunata, dar user-ul cu id-ul " + userId.toString() + " nu exista!");
        }
        Board board = boardRepository.findBoardByTitleAndUser(boardTitle,user.get());
        if(board == null) {
            throw new NotFoundException("Viata e miiinunata, dar board-ul cu titlul " + boardTitle + " nu exista!");
        }

        List<Photo> allPhotoFromDb = photoRepository.findAllByUserAndBoardsContainsOrderByCreationDateDesc(user.get(),board);

        if(lastPhotoSentId == null){
            startAdd = true;
        }

        while(photoListToReturn.size() < photoNumber && !allPhotoFromDb.isEmpty())
        {
            if(startAdd == true)
            {
                photoListToReturn.add(allPhotoFromDb.get(0));
                allPhotoFromDb.remove(allPhotoFromDb.get(0));
            }
            else{
                if(allPhotoFromDb.get(0).getPhotoId() == lastPhotoSentId){
                    startAdd = true;
                    allPhotoFromDb.remove(allPhotoFromDb.get(0));
                }
                else
                {
                    allPhotoFromDb.remove(allPhotoFromDb.get(0));
                }
            }
        }

        return photoListToReturn;

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
