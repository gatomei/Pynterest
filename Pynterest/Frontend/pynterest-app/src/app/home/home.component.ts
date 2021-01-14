import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { PinDetails } from '@app/shared/models/pinDetailsModel';
import { SearchService } from '@app/shared/services/search.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { PhotosService } from '../shared/services/photos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  photos: PinDetails[] = new Array<PinDetails>();
  throttle = 300;
  requestChunk = 12;
  notEmptyPost = true;
  notscrolly = true;
  isLoaded = false;
  searchPage = false;
  subs: Subscription[] = new Array<Subscription>(); 
  query: string = "";

  constructor(private spinner: NgxSpinnerService, private photosService: PhotosService,
     private activatedRoute: ActivatedRoute, 
     private searchService: SearchService) {
      
     }

  ngOnDestroy(): void {
    for(let sub of this.subs)
    {
      sub.unsubscribe();
    }
  }
  
  ngOnInit(): void {
    this.query = this.activatedRoute.snapshot.queryParams.q;
    if(this.query)
    {
      this.searchPage = true;
      //this.loadFromSearch(query);
    }
    else
    {
      this.loadInitPhotos();
    }
  }

  loadFromSearch(query: string){
    this.subs.push(this.searchService.getSearchPhotos(query).subscribe((data)=>{
      for(let photoId of data)
      {
          this.getPhoto(photoId);
      }
    }, (error)=>{
      console.log(error);
    }));
  }

  getPhoto(id: number)
  {
      this.subs.push(this.photosService.getPhotoById(id.toString())
      .subscribe((photo)=>{
          this.photos.push(photo);
      }, (error)=>{
        console.log(error);
      }));
  }

  resetAndSearch(query)
  {
    this.photos = [];
    this.searchPage = (query != "");
    this.query = query;
    if(this.searchPage)
    {
      this.loadFromSearch(query);
    }
    else{
      this.loadInitPhotos();
    }
  }

  loadInitPhotos() {
    this.photosService.getPhotosForFeed(this.requestChunk, null).subscribe(
      (data) => {
        this.photos = data;
        if(data.length==0)
         {
          this.notEmptyPost=false;
         }
        this.isLoaded = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onScroll() {
    if (this.isLoaded && !this.searchPage) {
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
