import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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

  constructor(private formBuilder: FormBuilder) { }

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
  }

  submitRegisterForm(){
    console.log("Username: " + this.registerForm.get("username").value);
    console.log("Fullname: " + this.registerForm.get("fullname").value);
    console.log("Email: " + this.registerForm.get("email").value);
    console.log("Password: " + this.registerForm.get("password").value);
    console.log("Description: " + this.registerForm.get("description").value);
    console.log("Date: " + this.registerForm.get("datepicker").value);
    console.log("Photo: " + this.registerForm.get("photo").value);
  }

  submitPasswordForm(){
    console.log("Email: " + this.resetPasswordForm.get("email").value);
  }

  resetPassword(){
    this.formOpened = formType.resetPassword
  }

  changeRegisterForm(){
    this.formOpened = formType.createNewAccount

  }

  changeLoginForm(){
    this.formOpened = formType.login;
  }


}
