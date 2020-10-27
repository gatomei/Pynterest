import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  loginForm: FormGroup = this.formBuilder.group({
    email: [,{validators: [Validators.required, Validators.email], updateOn: "change",}],
    password: [, { validators: [Validators.required], updateOn: "change" }]
    });

  ngOnInit(): void {
  }

  submitForm(){
    console.log("Email: " + this.loginForm.get("email").value);
    console.log("Password: " + this.loginForm.get("password").value);
  }

}
