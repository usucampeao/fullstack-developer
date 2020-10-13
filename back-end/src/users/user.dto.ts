export class LoginUserDto {
    readonly email: string;
    readonly password: string;
}

export class CreateUserDto {
    login: string;
    name: string;
    email: string;
    password: string;
    isMaster: boolean;
}

export class Users {
    login: string;
    name: string;
    email: string;    
}