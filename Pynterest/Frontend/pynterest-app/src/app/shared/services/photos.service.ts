import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Pin } from '../models/pinModel';
import { PhotoModel } from '../models/photoModel';
import { PinDetails } from '../models/pinDetailsModel';
import { ReadComment } from '../models/readCommentModel';
import { WriteComment } from '../models/writeCommentModel';
import { ReadPhotoModel } from '../models/readPhotoModel';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private httpClient: HttpClient) {

  }

  getPhotosForFeed(photoNumber:Number, lastPhotoSentId:string) {
    let params = new HttpParams().set('photoNumber', photoNumber.toString())

    if(lastPhotoSentId!=null)
      params = params.set('lastPhotoSentId', lastPhotoSentId);
    const getPhotosEndpoint = `${environment.baseAPIAuth}/photos/MainPage`;
    return this.httpClient.get<PinDetails[]>(getPhotosEndpoint, {params:params});
  }

  addPhoto(photo: PhotoModel) {
    const addPhotoEndpoint = `${environment.baseAPIAuth}/photos`;
    return this.httpClient.post<any>(addPhotoEndpoint, photo, { observe: 'response' });
  }

  addPhotoToBoard(photoId: number, boardId: number) {
    const addPhotoToBoardEndpoint = `${environment.baseAPIAuth}/boards/${boardId}/photos/${photoId}`;
    return this.httpClient.put<any>(addPhotoToBoardEndpoint, null);
  }

  getPhotoById(id: String) {
    const getPhotoEndpoint = `${environment.baseAPIAuth}/photos/${id}`;
    return this.httpClient.get<PinDetails>(getPhotoEndpoint);
  }

  getCommentsForPhoto(id: String) {
    const getCommentsEndpoint = `${environment.baseAPIAuth}/photos/${id}/comments`;
    return this.httpClient.get<ReadComment[]>(getCommentsEndpoint);
  }

  addCommentToPhoto(comment: WriteComment, id: string) {
    const addCommentToPhoto = `${environment.baseAPIAuth}/photos/${id}/comments`;
    return this.httpClient.post<any>(addCommentToPhoto, comment, { observe: 'response' });
  }

  deleteCommentFromPhoto(photoId: string, commentId: string) {
    const deleteCommentEndpoint = `${environment.baseAPIAuth}/photos/${photoId}/comments/${commentId}`;
    return this.httpClient.delete<any>(deleteCommentEndpoint);
  }

  getUserPhotos(username: string, photoNumber: number, lastPhotoSendId: number) {

    let getUserPhotosEndpoint;

    if (lastPhotoSendId == null) {
      getUserPhotosEndpoint = `${environment.baseAPIAuth}/photos/UserPhotos?photoNumber=${photoNumber}&userName=${username}`;
    }
    else {
      getUserPhotosEndpoint = `${environment.baseAPIAuth}/photos/UserPhotos?lastPhotoSendId=${lastPhotoSendId}&photoNumber=${photoNumber}&userName=${username}`;
    }

    return this.httpClient.get<ReadPhotoModel[]>(getUserPhotosEndpoint);
  }
}
