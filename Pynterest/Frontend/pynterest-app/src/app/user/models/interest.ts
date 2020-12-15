import { SafeUrl } from '@angular/platform-browser';

export interface Interest {
    interestId: number,
    interestName: string,
    isInCurrentUserInterestsList: boolean,
    randomPicture: SafeUrl
}
