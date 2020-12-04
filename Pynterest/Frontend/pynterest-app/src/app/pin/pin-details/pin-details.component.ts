import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { PhotosService } from '@app/shared/services/photos.service';
import { PinDetails } from '@app/shared/models/pinDetailsModel';
import { UserInfoService } from '@app/user/services/user-info.service';


@Component({
  selector: 'app-pin-details',
  templateUrl: './pin-details.component.html',
  styleUrls: ['./pin-details.component.scss']
})
export class PinDetailsComponent implements OnInit {

  public pin:PinDetails;

  constructor( private sanitizer: DomSanitizer,
    private photosService:PhotosService,
    private userService:UserInfoService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.photosService
        .getPhotoById(id)
        .subscribe((data) => {
          this.pin = data;
        },
        (error)=>{
          console.log(error);
        });


  }

  getImageUrl(){

    return this.sanitizer.bypassSecurityTrustUrl(
      'data:image/png;base64,' + this.pin.pictureData
    );
  }


  openBoardViewDialog()
  {
  }
}
