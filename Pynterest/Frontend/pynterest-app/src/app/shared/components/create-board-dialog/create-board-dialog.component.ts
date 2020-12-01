import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Board } from '@app/shared/models/boardModel';
import { BoardsService } from '../../services/boards.service';
import { NotificationService } from '@app/core/services/notification.service';

@Component({
  selector: 'app-create-board-dialog',
  templateUrl: './create-board-dialog.component.html',
  styleUrls: ['./create-board-dialog.component.scss']
})
export class CreateBoardDialogComponent implements OnInit {

  public userId: string;
  public boardForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private boardService: BoardsService,
    private notifications: NotificationService,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.userId = data.userId;
    this.boardForm = this.formBuilder.group({
      boardName: ['', { validators: [Validators.required], updateOn: "change" }],
      privateBoard: ['', { updateOn: "change" }]
    });

  }


  ngOnInit(): void {
  }

  addBoard() {
    var isPrivate = (this.boardForm.get("privateBoard").value != null
      && this.boardForm.get("privateBoard").value != "") ?
      this.boardForm.get("privateBoard").value : false;
    const board: Board = {
      userId: this.userId,
      title: this.boardForm.get("boardName").value,
      privateBoard: isPrivate
    }

    this.boardService.createNewBoard(board).subscribe(
      (response: any) => {
        const header = response.headers.get('Location'); //header location=id of the new board
        console.log(header);
      },
      (error) => {
        this.notifications.showError("Your board couldn't be created! A board with the same name already exists!", 'Error');

      }
    );

  }

}
