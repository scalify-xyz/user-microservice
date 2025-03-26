import { User } from "@domain/entity/user.entity";

export type LoginDTO = {
    email: string;
    password: string;
}

export type LoginResponseDTO = {
    token: string;
}

export type ChangePasswordDTO = {
    email: string;
    password: string;
}

export type ChangePasswordResponseDTO = {
}

export type SaveDTO = {
    name: string;
    email: string;
    password: string;
}

export type SaveResponseDTO = {
    id: string;
}

export type UserCreatedEventDTO = {
    id: string;
    email: string;
}