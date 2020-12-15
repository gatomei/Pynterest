import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from '@app/core/services/session-storage.service';
import { ReadCategoryModel } from '@app/shared/models/readCategoryModel';
import { JwtDecoderService } from '@app/shared/services/jwt-decoder.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserInterestsService {

  constructor(private httpClient: HttpClient,
    private jwtService: JwtDecoderService) {

  }

  getInterests() {
    const getCategoriesEndpoint = `${environment.baseAPIAuth}/user/${this.jwtService.getUsername()}/interests`;
    return this.httpClient.get<ReadCategoryModel[]>(getCategoriesEndpoint);
  }

  addInterest(interestId: Number) {
    const addCategoryEndpoint = `${environment.baseAPIAuth}/user/${this.jwtService.getUsername()}/interests/${interestId}`;
    return this.httpClient.put(addCategoryEndpoint, "");
  }

  removeInterest(interestId: Number) {
    const addCategoryEndpoint = `${environment.baseAPIAuth}/user/${this.jwtService.getUsername()}/interests/${interestId}`;
    return this.httpClient.delete(addCategoryEndpoint);
  }
  
}
