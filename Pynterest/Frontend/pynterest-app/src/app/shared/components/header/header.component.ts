import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from '@app/core/models/user';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { JwtDecoderService } from '@app/shared/services/jwt-decoder.service';
import { UserInfoService } from '@app/user/services/user-info.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public messagesUnseen:Number;
  public notificationsUnseen: Number;
  public username:string;
  public isNotificationPressed = false;
  public isMessagesPressed = false;
  private sub:Subscription;
  public imageUrl:SafeUrl = "";

  constructor(private router:Router,
     private authenticationService: AuthenticationService,
     private JwtDecoderService: JwtDecoderService,
     private userInfoService:UserInfoService,
     private sanitizer:DomSanitizer,
     private localStorage:LocalStorageService) {
    this.router = router;
    this.notificationsUnseen = 0;
    this.messagesUnseen = 0;
   }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    let image = this.localStorage.get<string>("profilePicture");
    if(image == null)
    {
      this.sub = this.userInfoService.getInfo(this.JwtDecoderService.getUsername()).subscribe((data)=>{
        this.localStorage.set("profilePicture", data.profilePicture);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/json;base64,'+data.profilePicture);
      },(error)=>{
        console.log(error);
      });
    }
    else
    {
      console.log("Nu s-a facut call!");
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/json;base64,'+ image);
    }
  }
   
  public logOut() {
    // functia de log out, se duce pe pagina de log in
    // sterge din session storage informatiile memorate pentru utilizatorul actual
    this.authenticationService.removeUserFromLocalStorage();
    this.localStorage.remove("profilePicture");
    this.router.navigate(['login']);
  }

  public goToHomePage()
  {
    this.router.navigate(['home']);
  }

  isNotificationBadgeHidden():boolean
  {
    return this.notificationsUnseen == 0;
  }

  isMessageBadgeHidden():boolean
  {
    return this.messagesUnseen == 0;
  }

  public toUserProfile(){
    this.router.navigate(['users', this.JwtDecoderService.getUsername(),'profile']);
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
