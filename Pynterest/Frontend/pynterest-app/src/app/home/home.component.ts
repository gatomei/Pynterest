import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PinDetails } from '@app/shared/models/pinDetailsModel';
import { NgxSpinnerService } from 'ngx-spinner';
import { PhotosService } from '../shared/services/photos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  photos: PinDetails[] = new Array<PinDetails>();
  throttle = 300;
  requestChunk = 8;
  notEmptyPost = true;
  notscrolly = true;
  isLoaded = false;

  constructor(private spinner: NgxSpinnerService, private photosService: PhotosService) {}

  ngOnInit(): void {
    this.loadInitPhotos();
  }

  loadInitPhotos() {
    this.photosService.getPhotosForFeed(this.requestChunk, null).subscribe(
      (data) => {
        this.photos = data;
        this.isLoaded = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onScroll() {
    if (this.isLoaded) {
      if (this.notscrolly && this.notEmptyPost) {
        this.spinner.show();
        this.notscrolly = false;
        this.loadNextPhotos();
      }
    }
  }

  loadNextPhotos() {
    let lastPhotoSentId = this.photos[this.photos.length - 1].photoId;

    this.photosService.getPhotosForFeed(this.requestChunk, lastPhotoSentId).subscribe(
      (data) => {
        this.spinner.hide();
        if (data.length == 0) this.notEmptyPost = false;
        this.photos = this.photos.concat(data);
        this.notscrolly = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
