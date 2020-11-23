import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-create-board-dialog',
  templateUrl: './create-board-dialog.component.html',
  styleUrls: ['./create-board-dialog.component.scss']
})
export class CreateBoardDialogComponent implements OnInit {

  boardForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private dialogRef:MatDialogRef<CreateBoardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    ) { }


  ngOnInit(): void {
    this.boardForm = this.formBuilder.group(
      {boardName: [, { validators: [Validators.required], updateOn: "change" }],});
  }


  close(){
    this.dialogRef.close();
  }

  addBoard(){
    this.dialogRef.close(this.boardForm.value);
  }
}
