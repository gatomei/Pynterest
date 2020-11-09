import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInfo } from '@app/shared/models/jwt/userInfoModel';
import { JwtDecoderService } from '@app/shared/services/jwt-decoder.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  public subscribers:number = 10;
  public subscriptions:number = 12;
  public user:UserInfo;
  public suscribedUser:boolean = true;
  private userId: String;
  private routeSub: Subscription;

  constructor(private jwtDecoder: JwtDecoderService,
    private activatedRoute: ActivatedRoute) { }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  ngOnInit(): void {
    this.user = {
      id: "1",
      email: "email",
      username: "sub",
      fullname: "ddd",
      birthDate: new Date(),
      description: "dd",
      admin: true
    };
    this.routeSub = this.activatedRoute.params.subscribe(params=>{
      this.userId = params['id'];
      let jwtUserId = this.jwtDecoder.getId();
      if(this.userId == jwtUserId)
      {
        this.user = this.jwtDecoder.getAllInfo();
      }
      else{
        //make request for user info with id
      }
    });
  }

  public isHisPage():boolean
  {
    return this.userId == this.user.id;
  }

  isSubscribed(id):boolean
  {
    return this.suscribedUser;
  }

  unsubscribe(){
    this.suscribedUser = false;
  }

  subscribe(){
    this.suscribedUser = true;
  }
}
