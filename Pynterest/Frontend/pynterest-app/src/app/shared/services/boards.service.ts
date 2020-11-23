import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {CreateBoardDialogComponent} from '../components/create-board-dialog/create-board-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  constructor(public dialog: MatDialog,
    private httpClient:HttpClient) { }

  openDialog() {

    const dialogRef = this.dialog.open(CreateBoardDialogComponent, {panelClass: 'custom-dialog-container'})

    dialogRef.afterClosed().subscribe(
      data => console.log("Dialog output:", data)
  );
  }



}
