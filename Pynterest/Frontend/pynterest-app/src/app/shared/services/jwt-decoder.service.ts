import { Injectable } from '@angular/core';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JWTUserInfo } from '../models/userInfoModel';

@Injectable({
  providedIn: 'root'
})
export class JwtDecoderService {
  private decodeToken;
  private token;

  constructor(
    private jwtHelper: JwtHelperService,
    private localstorageService: LocalStorageService
  ) {}

  getAllInfo(): JWTUserInfo {
    this.token = this.localstorageService.get("userToken")["jwt"];
    this.decodeToken = this.jwtHelper.decodeToken(this.token);
    return {
      id: this.decodeToken["userId"],
      email: this.decodeToken["email"],
      username: this.decodeToken["sub"],
      fullname: this.decodeToken["fullname"],
      birthDate: this.decodeToken["birthDate"],
      description: this.decodeToken["description"],
      admin: this.decodeToken["admin"]
    };
  }

  isExpired(): boolean {
    return this.jwtHelper.isTokenExpired(this.token);
  }

  getUsername(): string {
    this.token = this.localstorageService.get("userToken")["jwt"];
    this.decodeToken = this.jwtHelper.decodeToken(this.token);
    return this.decodeToken["sub"];
  }

  getId(): string {
    this.token = this.localstorageService.get("userToken")["jwt"];
    this.decodeToken = this.jwtHelper.decodeToken(this.token);
    return this.decodeToken["userId"];
  }

}
