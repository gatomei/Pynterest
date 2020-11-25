import {
  Component,
  Inject,
  OnInit
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FollowDialogModel } from '@app/shared/models/followDialogModel';
import { FollowModel } from '@app/shared/models/followModel';
import { UserFollowService } from '../../../user/services/user-follow.service';
import { JwtDecoderService } from '../../services/jwt-decoder.service';

@Component({
  selector: 'app-follow-dialog',
  templateUrl: './follow-dialog.component.html',
  styleUrls: ['./follow-dialog.component.scss']
})
export class FollowDialogComponent implements OnInit {

  public imgUrl: SafeUrl[];
  public currentUserFollowModel: FollowModel[];
  private loggedInUserFollowingModel: FollowModel[]
  private loggedInUserFollowingModelStates: Array<[FollowModel, boolean]>;
  private loggedInUserUsername: string;

  constructor(@Inject(MAT_DIALOG_DATA) public followDialogModel: FollowDialogModel,
    private sanitizer: DomSanitizer,
    private userFollowService: UserFollowService,
    private jwtDecoderService: JwtDecoderService
  ) {
    this.imgUrl = [];
    this.loggedInUserFollowingModel = followDialogModel.loggedInUserFollowingModel;
    this.loggedInUserFollowingModelStates = [];
    this.loggedInUserUsername = this.jwtDecoderService.getUsername();
  }

  ngOnInit(): void {
    this.currentUserFollowModel = this.followDialogModel.currentUserFollowModel;
    this.setImageUrlArray();
    this.setLoggedInUserFollowingStates();
  }

  isUserTheLoggedInUser(username: string) {
    return this.loggedInUserUsername == username;
  }

  setLoggedInUserFollowingStates() {
    this.loggedInUserFollowingModel.forEach(model => {
      let followingModel_state: [FollowModel, boolean] = [model, true];
      this.loggedInUserFollowingModelStates.push(followingModel_state);
    })
  }

  setImageUrlArray() {
    this.currentUserFollowModel.forEach(user => {
      this.imgUrl.push(this.sanitizer.bypassSecurityTrustUrl(
        'data:image/png;base64,' + user.profilePicture));
    })
  }

  onFollowClick(username: string) {
    this.setStateFollowedUser(username);
    this.userFollowService.followUser(username).subscribe(
      (error) => { console.log(error) }
    )
  }

  onUnfollowClick(username: string) {
    this.setStateUnfollowedUser(username);
    this.userFollowService.unfollowUser(username).subscribe(
      (error) => { console.log(error) }
    )
  }

  isUserFollowed(username: string) {
    var isUserFollowed: boolean = false;

    this.loggedInUserFollowingModelStates.forEach(followingModel_state => {
      let followingModel = followingModel_state[0];
      let state = followingModel_state[1];
      if (followingModel.username == username) {
        isUserFollowed = state;
      }
    });

    return isUserFollowed;
  }

  setStateUnfollowedUser(username: string) {
    this.loggedInUserFollowingModelStates.forEach((followingModel_state) => {
      let followingModel = followingModel_state[0];
      if (followingModel.username == username) {
        followingModel_state[1] = false;
      }
    });
  }

  setStateFollowedUser(_username: string) {
    let userExists: boolean = false;

    this.loggedInUserFollowingModelStates.forEach((followingModel_state) => {
      let followingModel = followingModel_state[0];
      if (followingModel.username == _username) {
        userExists = true;
        followingModel_state[1] = true;
      }
    });

    if (userExists == false) {
      let model: FollowModel = { username: _username, profilePicture: [] }
      let followingModel_state: [FollowModel, boolean] = [model, true];
      this.loggedInUserFollowingModelStates.push(followingModel_state)
    }
  }

  userExistsInFollowingModel(_username) {
    let userExists: boolean = false;

    this.loggedInUserFollowingModel.forEach(model => {
      if (model.username == _username) {
        userExists = true;
      }
    });

    return userExists;
  }
}
