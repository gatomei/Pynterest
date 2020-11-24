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

  openFollowersDialog(followModel: FollowModel[]) {

    var followDialogModel: FollowDialogModel = {
      dialogTitle: 'Followers',
      data: followModel
    }

    this.dialog.open(FollowDialogComponent, { data: { followDialogModel }, panelClass: 'custom-dialog-container' });
  }
  openFollowingDialog(followModel: FollowModel[]) {

    var followDialogModel: FollowDialogModel = {
      dialogTitle: 'Following',
      data: followModel
    }

    this.dialog.open(FollowDialogComponent, { data: { followDialogModel }, panelClass: 'custom-dialog-container' });
  }
}
