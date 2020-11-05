import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { NotificationService } from '@app/core/services/notification.service';
import { UserForRegister } from '@app/core/models/userForRegister';
import { NgxImageCompressService } from 'ngx-image-compress';

enum formType{
  login,
  createNewAccount,
  resetPassword
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private authService:AuthenticationService,
              private notifications: NotificationService, 
              private router: Router,
              private imageCompress: NgxImageCompressService) { }

  formOpened = formType.login;

  loginForm: FormGroup = this.formBuilder.group({
    email: [,{validators: [Validators.required, Validators.email], updateOn: "change",}],
    password: [, { validators: [Validators.required], updateOn: "change" }]
    });

  registerForm: FormGroup = this.formBuilder.group({
    username: [, { validators: [Validators.required], updateOn: "change" }],
    fullname: [, { validators: [Validators.required], updateOn: "change" }],
    email: [,{validators: [Validators.required, Validators.email], updateOn: "change",}],
    password: [, { validators: [Validators.required], updateOn: "change" }],
    description: [, { updateOn: "change" }],
    datepicker: [, { updateOn: "change" }],
    photo: [, { updateOn: "change" }]
  });

  resetPasswordForm: FormGroup = this.formBuilder.group({
    email: [,{validators: [Validators.required, Validators.email], updateOn: "change",}]
  })

  ngOnInit(): void {
  }

  submitLoginForm(){
    console.log("Email: " + this.loginForm.get("email").value);
    console.log("Password: " + this.loginForm.get("password").value);
    this.authService.login(this.loginForm.get("email").value,this.loginForm.get("password").value).subscribe(
      res => {
        this.router.navigate(['home-page']);
      },
      error => {
        if (error.status === 401) {
          this.notifications.showError('This user does not exist!' , 'Login Error' , 5000);
        }
        else{
          this.notifications.showError('Something bad happened. Please contact the administrator!' , 'Login Error' , 5000);

        }
      }
    );
  }

  async submitRegisterForm(){
    let imgResultAfterCompress:string;
    let photoInBytes  = <string>await this.toBase64(this.registerForm.get("photo").value.files[0]);

    await this.imageCompress.compressFile(photoInBytes, -1 ,50, 50).then(
      result => {
        imgResultAfterCompress = result;
      }
    );
    let fileType = imgResultAfterCompress.split(",")[0];
    let photoToSend = imgResultAfterCompress.split(",")[1];

    let regexp = new RegExp('(?<=\:)image(?=\/)');
    if(regexp.test(fileType))
    {
      const user: UserForRegister = {
        email : this.registerForm.get("email").value,
        username : this.registerForm.get("username").value,
        fullname : this.registerForm.get("fullname").value,
        password : this.registerForm.get("password").value,
        birthDate : this.registerForm.get("datepicker").value,
        description : this.registerForm.get("description").value,
        profilePicture : photoToSend
      }
      this.authService.registerUser(user).subscribe(
        () => {
          this.notifications.showSuccess('Success', 'User Added');
        },
        (error) => {
          this.notifications.showError(error.message, 'Error');
        }
      )
    }
    else{
      this.notifications.showError("The file inserted is not a photo", 'Error');
    }


  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });


  submitPasswordForm(){
    console.log("Email: " + this.resetPasswordForm.get("email").value);
  }

  resetPassword(){
    this.formOpened = formType.resetPassword;
  }

  changeRegisterForm(){
    this.formOpened = formType.createNewAccount;

  }

  changeLoginForm(){
    this.formOpened = formType.login;
  }


}
