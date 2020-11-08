import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public subscribers:number = 10;
  public subscriptions:number = 12;
  public name:String = "Florinel";
  public description:String = "Florineldsfndnddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd";
  public username:String = "Baci";
  public suscribedUser:boolean = true;

  constructor() { }

  ngOnInit(): void {
    
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
