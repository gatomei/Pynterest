import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Pin } from '../models/pinModel';
import { PhotoModel } from '../models/photoModel';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private httpClient: HttpClient) {

  }

  getPhotosForFeed() {
    const getPhotosEndpoint = `${environment.baseAPIAuth}/photos`;
    return this.httpClient.get<Pin>(getPhotosEndpoint);
  }

  addPhoto(photo: PhotoModel) {
    const addPhotoEndpoint = `${environment.baseAPIAuth}/photos`;
    return this.httpClient.post(addPhotoEndpoint, photo);
  }

}
