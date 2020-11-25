import { FollowModel } from './followModel';

export interface FollowDialogModel {
    dialogTitle: string,
    currentUserFollowModel: FollowModel[],
    loggedInUserFollowingModel: FollowModel[];
}