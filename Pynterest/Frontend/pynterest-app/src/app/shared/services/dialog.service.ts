import { FollowModel } from '@app/shared/models/followModel';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FollowDialogComponent } from '../components/follow-dialog/follow-dialog.component';
import { FollowDialogModel } from '../models/followDialogModel';
import { AddPinDialogComponent } from '../components/add-pin-dialog/add-pin-dialog.component';
import { CreateBoardDialogComponent } from '../components/create-board-dialog/create-board-dialog.component';
import { AddCategoryDialogComponent } from '../components/add-category-dialog/add-category-dialog.component';
import { DeleteBoardDialogComponent } from '../components/delete-board-dialog/delete-board-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public followDialog: MatDialog,
    public addPinDialog: MatDialog,
    public addBoardDialog: MatDialog,
    public addCategoryDialog: MatDialog,
    public deleteBoardDialog: MatDialog) { }

  openFollowDialog(_currentUserFollowModel: FollowModel[], _loggedInUserFollowingModel: FollowModel[], _dialogTitle: string) {

    var data: FollowDialogModel = {
      dialogTitle: _dialogTitle,
      currentUserFollowModel: _currentUserFollowModel,
      loggedInUserFollowingModel: _loggedInUserFollowingModel
    }

    this.followDialog.open(FollowDialogComponent,
      { data, panelClass: 'custom-dialog-container' });
  }

  openAddPinDialog() {

    const dialogRef = this.addPinDialog.open(AddPinDialogComponent,
      { panelClass: 'custom-dialog-container' });

    return dialogRef.afterClosed()
  }

  openAddBoardDialog(data) {

    const dialogRef = this.addBoardDialog.open(CreateBoardDialogComponent, {
      data: data,
      panelClass: 'custom-dialog-container',
    });

    return dialogRef.afterClosed()
  }

  openAddCategoryDialog() {
    const dialogRef = this.addCategoryDialog.open(AddCategoryDialogComponent,
      { panelClass: 'custom-dialog-container' });

    return dialogRef.afterClosed()
  }

  openDeleteBoardDialog(data) {
    const dialogRef = this.deleteBoardDialog.open(DeleteBoardDialogComponent,

      {
        data: data,
        panelClass: 'custom-dialog-container'
      })

    return dialogRef.afterClosed()
  }
}
