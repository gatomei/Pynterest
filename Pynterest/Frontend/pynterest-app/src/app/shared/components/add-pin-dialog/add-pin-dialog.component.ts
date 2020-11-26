import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JwtDecoderService } from '../../services/jwt-decoder.service';
import { UserInfoService } from '@app/user/services/user-info.service';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { PhotoModel } from '../../models/photoModel';
import { PhotosService } from '@app/shared/services/photos.service';

@Component({
  selector: 'app-add-pin-dialog',
  templateUrl: './add-pin-dialog.component.html',
  styleUrls: ['./add-pin-dialog.component.scss']
})
export class AddPinDialogComponent implements OnInit {

  public addPinForm: FormGroup = this.formBuilder.group({
    title: [, { updateOn: "change" }],
    description: [, { updateOn: "change" }],
    category: [, { updateOn: "change" }],
    photo: [, { validators: [Validators.required], updateOn: "change" }]
  })

  public categoryList: string[] = [
    "Other/Everything", "Animals", "Architecture", "Art", "Cars and motorcycles", "Celebrities", "DIY and crafts",
    "Design", "Education", "Entertainment", "Food and drink", "Gardening", "Geek", "Hair and beauty",
    "Health and fitness", "History", "Holidays and events", "Home decor", "Humor", "Fashion", "Outdoors",
    "Photography", "Quotes", "Science", "Travel"
  ];

  faArrowAltCircleUp = faArrowAltCircleUp;

  public uploadedValidPhoto: boolean = true;
  public loggedInUserUsername: string;
  public imgUrl: SafeUrl;
  public imagePath: string;
  public url: any;
  public isPhotoSelected: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private jwtDecoderService: JwtDecoderService,
    private userInfoService: UserInfoService,
    private photosService: PhotosService
  ) {
    this.loggedInUserUsername = this.jwtDecoderService.getUsername();
    this.setLoggedInUserImageUrl();
  }

  ngOnInit(): void {
  }

  setLoggedInUserImageUrl() {
    this.userInfoService.getInfo(this.loggedInUserUsername).subscribe(
      (data) => {
        this.imgUrl = this.sanitizer.bypassSecurityTrustUrl(
          'data:image/png;base64,' + data.profilePicture
        );
      },
      (error) => {
        console.log(error);
      });
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  async submitAddPinForm(_addPinForm) {

    console.log("valid:" + this.uploadedValidPhoto)

    this.addPinForm = _addPinForm;
    let _photoInBytes = <string>await this.toBase64(this.addPinForm.get("photo").value?.files[0]);
    let _categoryName = this.addPinForm.get("category").value;

    if (_categoryName == null) {
      _categoryName = "Others/Everything";
    }

    let photo: PhotoModel = {
      title: this.addPinForm.get("title").value,
      description: this.addPinForm.get("description").value,
      categoryName: _categoryName,
      pictureData: _photoInBytes
    }

    this.photosService.addPhoto(photo).subscribe((error) => console.log(error));
  }

  onFileChanged(event) {

    const files = event.target.files;
    if (files.length === 0)
      return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.url = "";
      this.uploadedValidPhoto = false;
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
    this.isPhotoSelected = true;
    this.uploadedValidPhoto = true;
  }

}
