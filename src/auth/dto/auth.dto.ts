export class RegisterDto {
    name: string;
    last_names: string;
    email: string;
    password_hash: string;
    birthday: Date;
    country: string;
    city: string;
}

export class LoginDto {
    email: string;
    password: string;
}