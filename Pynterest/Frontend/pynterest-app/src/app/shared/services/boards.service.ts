import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'environments/environment';
import { Board } from '../models/boardModel';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor(public dialog: MatDialog, private httpClient: HttpClient) {}

  // openDialog(data) {
  //   const dialogRef = this.dialog.open(CreateBoardDialogComponent, {
  //     data: data,
  //     panelClass: 'custom-dialog-container',
  //   });

  //   dialogRef.afterClosed().subscribe((data) => this.createNewBoard(data));
  // }

  createNewBoard(board: Board) {
    if (board == null) return;

    const createBoardEndpoint = `${environment.baseAPIAuth}/boards`;
    return this.httpClient
      .post<any>(createBoardEndpoint, board, { observe: 'response' });
  }
}
