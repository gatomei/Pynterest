import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/core/models/user';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { JwtDecoderService } from '@app/shared/services/jwt-decoder.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public messagesUnseen:Number;
  public notificationsUnseen: Number;
  public username:string;
  public isNotificationPressed = false;
  public isMessagesPressed = false;
  public image = [];
  public user: User;

  constructor(private router:Router,
     private authenticationService: AuthenticationService) {
    this.router = router;
    this.notificationsUnseen = 0;
    this.messagesUnseen = 0;
   }

  ngOnInit(): void {
    
  }
   
  public logOut() {
    // functia de log out, se duce pe pagina de log in
    // sterge din session storage informatiile memorate pentru utilizatorul actual
    this.authenticationService.removeUserFromLocalStorage();
    this.router.navigate(['login']);
  }

  isNotificationBadgeHidden():boolean
  {
    return this.notificationsUnseen == 0;
  }

  isMessageBadgeHidden():boolean
  {
    return this.messagesUnseen == 0;
  }

  toggleNotificationButton():void{
    this.isNotificationPressed = ! this.isNotificationPressed;
    if(this.isMessagesPressed)
    {
      this.isMessagesPressed = ! this.isMessagesPressed;
    }
  }

  toggleMessageButton():void{
    this.isMessagesPressed = ! this.isMessagesPressed;
    if(this.isNotificationPressed)
    {
      this.isNotificationPressed = ! this.isNotificationPressed;
    }
  }

}
