export interface JWTUserInfo {
    id: string;
    email: string;
    username: string;
    fullname: string;
    birthDate: Date;
    description: String;
    admin: boolean
}