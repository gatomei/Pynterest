import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInfo } from '@app/user/models/user-info';
import { JwtDecoderService } from '@app/shared/services/jwt-decoder.service';
import { Subscription } from 'rxjs';
import { UserInfoService } from '../services/user-info.service';
import { HttpResponse } from '@angular/common/http';

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
  private username: String;
  private routeSub: Subscription;

  constructor(private jwtDecoder: JwtDecoderService,
    private activatedRoute: ActivatedRoute,
    private userInfoService:UserInfoService) {}

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe(params=>{
      this.username = params['username'];
    });
    this.userInfoService.getHey().subscribe((data)=>{
      console.log(data);
    });
  }

  public isHisPage():boolean
  {
    return true;
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
