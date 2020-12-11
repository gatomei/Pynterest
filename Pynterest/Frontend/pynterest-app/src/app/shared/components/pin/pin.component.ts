import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Pin } from '@app/shared/models/pinModel';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {
  @Input() public id:string='';
  @Input() public title: string = '';
  @Input() public photo: [] = [];

  private isButtonClick=false;

  constructor( private sanitizer: DomSanitizer,
    private router: Router) {
   }

  ngOnInit(): void {
  }

  clickCard(){

    if(!this.isButtonClick)
      this.router.navigate([`pin/${this.id}`]);
    this.isButtonClick=false;
  }

  openBoardViewDialog()
  {
    this.isButtonClick=true;
    console.log("openBoard");
  }
  getImageUrl(photo:[]){
    return this.sanitizer.bypassSecurityTrustUrl(
      'data:image/png;base64,' +photo
    );
  }

}
