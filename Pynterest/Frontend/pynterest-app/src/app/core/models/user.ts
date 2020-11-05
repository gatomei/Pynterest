export interface User {
    id: string;
    email: string;
    username: string;
    fullname: string;
    birthDate: Date;
    description: String;
    profilePicture:  BinaryType[];
    token: string;
}
