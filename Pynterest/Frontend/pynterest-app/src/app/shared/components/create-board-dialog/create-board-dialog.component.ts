import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Board } from '@app/shared/models/boardModel';

@Component({
  selector: 'app-create-board-dialog',
  templateUrl: './create-board-dialog.component.html',
  styleUrls: ['./create-board-dialog.component.scss']
})
export class CreateBoardDialogComponent implements OnInit {

  public userId:string;
  public boardNames:string[];
  public boardForm :FormGroup;

  constructor(private formBuilder: FormBuilder,
    private dialogRef:MatDialogRef<CreateBoardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    ) {
      this.userId = data.userId;
      this.boardNames = data.boardNames;
      this.boardForm = this.formBuilder.group({
        boardName:  ['', { validators: [Validators.required], updateOn: "change" }],
        privateBoard :['',{  updateOn: "change" }]});

    }


  ngOnInit(): void {

  }


  close(){
    this.dialogRef.close();
  }

  addBoard(){
    var isPrivate = (this.boardForm.get("privateBoard").value!=null)?
                this.boardForm.get("privateBoard").value:false;
    const board:Board ={
      userId:this.userId,
      title:this.boardForm.get("boardName").value,
      privateBoard:isPrivate
    }

    return this.dialogRef.close(board);
  }

  isBoardTitleUsed(title){
    return this.boardNames.includes(title);
  }
}
