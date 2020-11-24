import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {CreateBoardDialogComponent} from '../components/create-board-dialog/create-board-dialog.component';
import { environment } from 'environments/environment';
import { JwtDecoderService } from './jwt-decoder.service';
import { Board } from '../models/boardModel';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  constructor(public dialog: MatDialog,
    private httpClient:HttpClient) { }

  openDialog(data) {

    const dialogRef = this.dialog.open(CreateBoardDialogComponent, {data:data, panelClass: 'custom-dialog-container'})

    dialogRef.afterClosed().subscribe(
      data => this.sendNewBoard(data)
  );
  }


  sendNewBoard(board:Board){
    console.log(board);
    const createBoardEndpoint = `${environment.baseAPIAuth}/panel`;
    this.httpClient.post(createBoardEndpoint,board ).subscribe(
      () => {
        console.log("merge")
      },
      (error) => {
        console.log("eroare"+error)
      }
    );
  }


}
