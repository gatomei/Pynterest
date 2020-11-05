export interface UserForRegister {
    email: string;
    password: string;
    username: string;
    fullname: string;
    admin: boolean;
    birthDate: Date;
    description: String;
    profilePicture:  BinaryType;
}
