import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FollowDialogModel } from '../../core/models/followDialogModel';
import { FollowDialogComponent } from '../components/follow-dialog/follow-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class FollowDialogService {

  constructor(public dialog: MatDialog) { }

  openDialog(data: FollowDialogModel[]) {
    this.dialog.open(FollowDialogComponent, { data: data, panelClass: 'custom-dialog-container' });
  }
}
