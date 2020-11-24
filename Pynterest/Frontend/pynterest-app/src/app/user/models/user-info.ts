import { SafeUrl } from '@angular/platform-browser';
export interface UserInfo {
    email: string,
    username: string,
    fullname: string,
    birthDate: Date,
    description: string,
    profilePicture: SafeUrl
}
