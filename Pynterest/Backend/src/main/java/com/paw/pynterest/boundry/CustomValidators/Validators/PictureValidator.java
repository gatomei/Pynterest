package com.paw.pynterest.boundry.CustomValidators.Validators;

import com.paw.pynterest.boundry.CustomValidators.Constraints.PictureConstraint;

import javax.imageio.ImageIO;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;

public class PictureValidator implements ConstraintValidator<PictureConstraint, byte[]> {

    @Override
    public void initialize(PictureConstraint profilePicture) {
    }

    @Override
    public boolean isValid(byte[] profilePicture,
                           ConstraintValidatorContext cxt) {
        ByteArrayInputStream bis = new ByteArrayInputStream(profilePicture);
        BufferedImage bImage2 = null;
        try {
            bImage2 = ImageIO.read(bis);
        } catch (IOException e) {
            return false;
        }

        return bImage2 != null;
    }

}