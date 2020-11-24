import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FollowDialogComponent } from '../components/follow-dialog/follow-dialog.component';
import { FollowModel } from '../models/followModel';
import { FollowDialogModel } from '../models/followDialogModel';


@Injectable({
  providedIn: 'root'
})
export class FollowDialogService {

  constructor(public dialog: MatDialog) { }

  openDialog(followModel: FollowModel[], dialogTitle: string) {

    var followDialogModel: FollowDialogModel = {
      dialogTitle: dialogTitle,
      data: followModel
    }

    this.dialog.open(FollowDialogComponent, { data: { followDialogModel }, panelClass: 'custom-dialog-container' });
  }
}
