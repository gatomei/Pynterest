import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NewPasswordModel } from '@app/core/models/newPasswordModel';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { NotificationService } from '@app/core/services/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private notifications: NotificationService,
              private activatedRoute: ActivatedRoute,
              private authService:AuthenticationService) { }
  token: string;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
  }

  newPasswordForm: FormGroup = this.formBuilder.group({
    password: [,{validators: [Validators.required], updateOn: "change",}],
    retypedPassword: [, { validators: [Validators.required], updateOn: "change" }]
    });

    submitNewPasswordForm(){
      let password = this.newPasswordForm.get("password").value
      let retypedPassword = this.newPasswordForm.get("retypedPassword").value
      if(password !== retypedPassword){
        this.notifications.showError('Passwords are not identical' , 'Password Error' , 5000);
      }
      else{
        const newPassword:NewPasswordModel = {
         newPassword : password,
         resetToken : this.token
        }
        this.authService.sendNewPassword(newPassword).subscribe(
          () => {
            this.notifications.showSuccess('You have successfully reset your password.  You may now login.', 'Success');
          },
          (error) => {
            this.notifications.showError(error.message, 'Error');
          }
        )

      }
    }



}
