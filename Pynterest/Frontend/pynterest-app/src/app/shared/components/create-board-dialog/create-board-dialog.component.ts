import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Board } from '@app/shared/models/boardModel';

@Component({
  selector: 'app-create-board-dialog',
  templateUrl: './create-board-dialog.component.html',
  styleUrls: ['./create-board-dialog.component.scss']
})
export class CreateBoardDialogComponent implements OnInit {

  boardForm: FormGroup;
  userId:string;

  constructor(private formBuilder: FormBuilder,
    private dialogRef:MatDialogRef<CreateBoardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    ) {
      this.userId = data.userId;
    }


  ngOnInit(): void {
    this.boardForm = this.formBuilder.group(
      {boardTitle: [, { validators: [Validators.required], updateOn: "change" }],
      privateBoard :[,{ validators: [Validators.required], updateOn: "change" }]});
  }


  close(){
    this.dialogRef.close();
  }

  addBoard(){
    const board:Board ={
      userId:this.userId,
      title:this.boardForm.get("boardTitle").value,
      privateBoard:this.boardForm.get("privateBoard").value
    }

    return this.dialogRef.close(board);
  }
}
