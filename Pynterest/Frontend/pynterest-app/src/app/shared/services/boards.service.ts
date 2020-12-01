import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'environments/environment';
import { Board } from '../models/boardModel';
import { SelectBoardModel } from '../models/selectBoardModel';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor(public dialog: MatDialog, private httpClient: HttpClient) { }

  createNewBoard(board: Board) {
    if (board == null) return;

    const createBoardEndpoint = `${environment.baseAPIAuth}/boards`;
    return this.httpClient
      .post<any>(createBoardEndpoint, board, { observe: 'response' });
  }

  getBoards(username: string) {
    const getBoardsEndpoint = `${environment.baseAPIAuth}/user/${username}/boards`;
    return this.httpClient.get<SelectBoardModel[]>(getBoardsEndpoint);

  }
}
