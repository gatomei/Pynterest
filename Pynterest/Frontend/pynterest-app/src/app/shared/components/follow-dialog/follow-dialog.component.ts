import {
  Component,
  Inject,
  OnInit
} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { FollowDialogModel } from '@app/shared/models/followDialogModel';
import { FollowModel } from '@app/shared/models/followModel';


@Component({
  selector: 'app-follow-dialog',
  templateUrl: './follow-dialog.component.html',
  styleUrls: ['./follow-dialog.component.scss']
})
export class FollowDialogComponent implements OnInit {

  followModel: FollowModel[];
  constructor(@Inject(MAT_DIALOG_DATA) public followDialogModel: FollowDialogModel,
    private sanitizer: DomSanitizer
  ) { }


  ngOnInit(): void {
    this.followModel = this.followDialogModel.data;
    this.followModel.forEach(user => {
      user.profilePicture = this.sanitizer.bypassSecurityTrustUrl(
        'data:image/png;base64,' + user.profilePicture);
    })
  }
}
