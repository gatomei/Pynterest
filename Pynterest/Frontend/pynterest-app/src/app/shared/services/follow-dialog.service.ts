import { FollowModel } from '@app/shared/models/followModel';
import { Injectable, ɵConsole } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FollowDialogComponent } from '../components/follow-dialog/follow-dialog.component';
import { FollowDialogModel } from '../models/followDialogModel';


@Injectable({
  providedIn: 'root'
})
export class FollowDialogService {

  constructor(public dialog: MatDialog) { }

  openDialog(_currentUserFollowModel: FollowModel[], _loggedInUserFollowingModel: FollowModel[], _dialogTitle: string) {

    var data: FollowDialogModel = {
      dialogTitle: _dialogTitle,
      currentUserFollowModel: _currentUserFollowModel,
      loggedInUserFollowingModel: _loggedInUserFollowingModel
    }

    this.dialog.open(FollowDialogComponent, { data, panelClass: 'custom-dialog-container' });
  }
}
