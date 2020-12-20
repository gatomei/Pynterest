import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { SessionStorageService } from '@app/core/services/session-storage.service';
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
  public username:string;
  public isMessagesPressed = false;
  private sub:Subscription;
  public imageUrl:SafeUrl = "";
  public suggestions = [];

  constructor(private router:Router,
     private authenticationService: AuthenticationService,
     private JwtDecoderService: JwtDecoderService,
     private userInfoService:UserInfoService,
     private sanitizer:DomSanitizer,
     private localStorage:SessionStorageService) {
    this.router = router;
    this.messagesUnseen = 0;
   }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    this.addKeyboardListenerToSearchBar();
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

  isMessageBadgeHidden():boolean
  {
    return this.messagesUnseen == 0;
  }

  public toUserProfile(){
    this.router.navigate(['users', this.JwtDecoderService.getUsername(),'profile']);
  }

  toggleMessageButton():void{
    this.isMessagesPressed = ! this.isMessagesPressed;
  }

  goToInterests():void{
    this.router.navigate(['users','interests']);
  }

  addKeyboardListenerToSearchBar()
  {
      let searchBar = document.getElementsByClassName("input")[0];
      searchBar.addEventListener("keydown", this.onKeyDownSearch);
  }

  onKeyDownSearch(event)
  {
    let searchBar = <HTMLInputElement>document.getElementsByClassName("input")[0];
    let autocommBox = document.getElementsByClassName("autocom-box")[0];
    let query = searchBar.value;
    if(event.keyCode >= 48 && event.keyCode <= 90)
    {
      query += event.key;
    }
    if(event.keyCode == 8)
    {
      query = query.substr(0, query.length - 1);
    }
    if(query.length > 2)
    {
      autocommBox.setAttribute("style", "display:inline-block;");
      // get suggestion from the backend
    }
    else
    {
      autocommBox.setAttribute("style", "display:none;");
    }
  }


}
