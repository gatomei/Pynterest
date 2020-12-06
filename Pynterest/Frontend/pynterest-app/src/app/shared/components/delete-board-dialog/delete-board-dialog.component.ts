import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardsService } from '@app/shared/services/boards.service';

@Component({
  selector: 'app-delete-board-dialog',
  templateUrl: './delete-board-dialog.component.html',
  styleUrls: ['./delete-board-dialog.component.scss']
})
export class DeleteBoardDialogComponent implements OnInit {

  private boardId: string;
  constructor( private boardService: BoardsService,
    @Inject(MAT_DIALOG_DATA) data,) {
      this.boardId = data.boardId;
     }

  ngOnInit(): void {
  }


  deleteBoard(){
    this.boardService.deleteBoard(this.boardId).subscribe(
      () => {
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
