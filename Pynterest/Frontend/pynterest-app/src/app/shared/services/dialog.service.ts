import { SafeUrl } from '@angular/platform-browser';
import { FollowModel } from '@app/shared/models/followModel';
import { Injectable, ɵConsole } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FollowDialogComponent } from '../components/follow-dialog/follow-dialog.component';
import { FollowDialogModel } from '../models/followDialogModel';
import { AddPinDialogComponent } from '../components/add-pin-dialog/add-pin-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public followDialog: MatDialog, public addPinDialog: MatDialog) { }

  openFollowDialog(_currentUserFollowModel: FollowModel[], _loggedInUserFollowingModel: FollowModel[], _dialogTitle: string) {

    var data: FollowDialogModel = {
      dialogTitle: _dialogTitle,
      currentUserFollowModel: _currentUserFollowModel,
      loggedInUserFollowingModel: _loggedInUserFollowingModel
    }

    this.followDialog.open(FollowDialogComponent, { data, panelClass: 'custom-dialog-container' });
  }

  openAddPinDialog() {

    this.addPinDialog.open(AddPinDialogComponent, { panelClass: 'custom-dialog-container' });
  }
}
