package com.paw.pynterest.boundry.CustomValidators.Constraints;

import com.paw.pynterest.boundry.CustomValidators.Validators.PictureValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = PictureValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface PictureConstraint {
    String message() default "Invalid picture!";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}