import { User } from "../../entity/user.entity";

export interface LoginDTO {
    email: string;
    password: string;
}

export interface LoginResponseDTO {
    token: string;
}

export interface ChangePasswordDTO {
    email: string;
    password: string;
}
export interface ChangePasswordResponseDTO {
}

export type SaveDTO = {
    name: string;
    email: string;
    password: string;
}

export type SaveResponseDTO = {
    id: string;
}

export interface IUserGatewayRepository {
    save(user: User): Promise<SaveResponseDTO>;
    login(data: LoginDTO): Promise<LoginResponseDTO>;
    changePassword(data: ChangePasswordDTO): Promise<void>;
}