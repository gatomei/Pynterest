import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ReadCategoryModel } from '@app/shared/models/readCategoryModel';
import { CategoryService } from '@app/shared/services/category.service';
import { PhotosService } from '@app/shared/services/photos.service';
import { Subscription } from 'rxjs';
import { Interest } from '../models/interest';
import { UserInterestsService } from '../services/user-interests.service';

@Component({
  selector: 'app-user-interests',
  templateUrl: './user-interests.component.html',
  styleUrls: ['./user-interests.component.scss']
})
export class UserInterestsComponent implements OnInit, OnDestroy {

  public interests: Array<Interest>;
  private subs: Array<Subscription>;
  private categories: ReadCategoryModel[];
  private userInterests: ReadCategoryModel[];
  constructor(private categoryService: CategoryService,
    private interestService:UserInterestsService,
    private photosService: PhotosService,
    private sanitizer:DomSanitizer
    ) { 
    this.interests = new Array<Interest>();
    this.subs = new Array<Subscription>();
  }

  ngOnDestroy(): void {
    this.subs.forEach(elem=>elem.unsubscribe());
  }

  ngOnInit(): void {
    this.initInterests();
  }

  private initInterests()
  {
    this.subs.push(
      this.interestService.getInterests().subscribe((data)=>{
        this.userInterests = data;
        this.initCategories();
      },(error)=>{
        console.log(error);
      })
    );
  }


  private initCategories(){
    this.subs.push(this.categoryService.getCategories().subscribe((data)=>{
      this.categories = data;
      this.createInterests();
    },(error)=>{
      console.log(error);
    }));
  }
  
  private createInterests()
  {
    this.categories.forEach(element => {
      this.subs.push(this.categoryService.getPhotosForCategory(element.categoryId)
      .subscribe((photos)=>{
        
        if(photos.length > 0)
        {
          const random = Math.floor(Math.random() * photos.length);
          this.subs.push(this.photosService.getPhotoById(photos[random].toString())
          .subscribe((photo)=>{
            let picture = this.sanitizer.bypassSecurityTrustUrl('data:image/json;base64,'+ photo.pictureData);
            let inInterests = this.isInInterests(element.categoryId);
            this.addInterest(element.categoryId, element.name, this.isInInterests(element.categoryId), picture);
          }, (error)=>{
            console.log(error);
          })
          );
        }
        else{
          this.addInterest(element.categoryId, element.name, this.isInInterests(element.categoryId), '');
        }
      }, (error)=>{
        console.log(error);
      }))
    });
  }

  private addInterest(interestId:number, interestName:string, isInList:boolean, picture:SafeUrl )
  {
    let interest: Interest = {
      interestId: interestId,
      interestName: interestName,
      isInCurrentUserInterestsList: isInList,
      randomPicture: picture
    }
    this.interests.push(interest);
  }

  private isInInterests(categoryId): boolean{
    for (const interest of this.userInterests) {
      if(interest.categoryId == categoryId)
      {
        return true;
      }
    }
    return false;
  }

  removeInterest(interest){
    interest.isInCurrentUserInterestsList = false;
    this.subs.push(
      this.interestService.removeInterest(interest.interestId)
      .subscribe(()=>{
        console.log("Interest removed!")
      })
    );
  }

  addUserInterest(interest){
    interest.isInCurrentUserInterestsList = true;
    this.subs.push(
      this.interestService.addInterest(interest.interestId)
      .subscribe(()=>{
        console.log("Interest added!")
      })
    );
  }

  emptyLink(interest):boolean
  {
    return interest.randomPicture == '';
  }
}
