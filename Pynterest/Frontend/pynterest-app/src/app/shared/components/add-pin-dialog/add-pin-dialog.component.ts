import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JwtDecoderService } from '../../services/jwt-decoder.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInfoService } from '@app/user/services/user-info.service';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { NgxImageCompressService } from 'ngx-image-compress';

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
  public msg: string;
  public imagePath;
  public url = null;
  public isPhotoSelected: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public profilePicture: [],
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private jwtDecoderService: JwtDecoderService,
    private userInfoService: UserInfoService,
    private imageCompress: NgxImageCompressService
  ) {
    this.loggedInUserUsername = this.jwtDecoderService.getUsername();
    this.imgUrl = this.sanitizer.bypassSecurityTrustUrl(
      'data:image/png;base64,' + profilePicture
    );

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

  ngOnInit(): void {
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  async submitAddPinForm(form) {
    this.addPinForm = form

    let imgResultAfterCompress: string;
    let photoInBytes = <string>await this.toBase64(this.addPinForm.get("photo").value?.files[0]);
    console.log(photoInBytes)
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
