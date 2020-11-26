import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateBoardDialogComponent } from '../components/create-board-dialog/create-board-dialog.component';
import { environment } from 'environments/environment';
import { Board } from '../models/boardModel';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor(public dialog: MatDialog, private httpClient: HttpClient) {}

  openDialog(data) {
    const dialogRef = this.dialog.open(CreateBoardDialogComponent, {
      data: data,
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((data) => this.createNewBoard(data));
  }

  createNewBoard(board: Board) {
    if (board == null) return;

    const createBoardEndpoint = `${environment.baseAPIAuth}/boards`;
    this.httpClient
      .post<any>(createBoardEndpoint, board, { observe: 'response' })
      .subscribe(
        (response: any) => {
          const header = response.headers.get('Location'); //header location=id of the new board
          console.log(header);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
