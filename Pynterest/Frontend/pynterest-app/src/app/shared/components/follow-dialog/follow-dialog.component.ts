import {
  Component,
  Inject,
  OnInit
} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { FollowDialogModel } from '../../../core/models/followDialogModel';

@Component({
  selector: 'app-follow-dialog',
  templateUrl: './follow-dialog.component.html',
  styleUrls: ['./follow-dialog.component.scss']
})
export class FollowDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: FollowDialogModel[]) { }


  ngOnInit(): void {
  }



}
