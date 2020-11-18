export interface UserInfo {
    userId:number,
    email:string,
    username:string,
    fullname:string,
    password:string,
    admin: boolean,
    birthDate: Date,
    description: string,
    resetToken: string,
    profilePicture: []
}
