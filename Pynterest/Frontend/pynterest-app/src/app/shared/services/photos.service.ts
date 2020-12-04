import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Pin } from '../models/pinModel';
import { PhotoModel } from '../models/photoModel';
import { PinDetails } from '../models/pinDetailsModel';

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
    return this.httpClient.post<any>(addPhotoEndpoint, photo, { observe: 'response' });
  }

  addPhotoToBoard(photoId: number, boardId: number) {
    const addPhotoToBoardEndpoint = `${environment.baseAPIAuth}/boards/${boardId}/photos/${photoId}`;
    return this.httpClient.put<any>(addPhotoToBoardEndpoint, null);
  }

  getPhotoById(id:String){
    const getPhotoEndpoint = `${environment.baseAPIAuth}/photos/${id}`;
    return this.httpClient.get<PinDetails>(getPhotoEndpoint);
  }

}
