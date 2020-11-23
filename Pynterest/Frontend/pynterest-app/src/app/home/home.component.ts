import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  photos:[];

  constructor() { }

  ngOnInit(): void {
  }

  clickCard(){
    console.log("s-a dat click");
  }
  onHover(){

  }
}
