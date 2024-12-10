import { PrismaClient } from "@prisma/client";

import { IUserGatewayRepository } from "../../../domain/gateway/repositories/user.gateway.repository";
import { IArgon2GatewayProvider } from "../../../domain/gateway/providers/argon2.gateway.provider";
import { IJsonWebTokenGatewayProvider } from "../../../domain/gateway/providers/jsonwebtoken.gateway.provider";

import { User } from "../../../domain/entity/user.entity";
import { AuthUserOutputDto } from "../../../usecases/auth-user/auth-user.usecase";


export class UserRepositoryPrisma implements IUserGatewayRepository {
    private constructor(
        private readonly prismaClient: PrismaClient,
        private readonly argon2Client: IArgon2GatewayProvider,
        private readonly jsonwebtokenClient: IJsonWebTokenGatewayProvider,
    ) { }

    public static create(
        prismaClient: PrismaClient,
        argon2Client: IArgon2GatewayProvider,
        jsonwebtokenClient: IJsonWebTokenGatewayProvider,
    ) {
        return new UserRepositoryPrisma(prismaClient, argon2Client, jsonwebtokenClient);
    }

    public async save(user: User): Promise<void> {
        const verificationUser = await this.prismaClient.user.findFirst({ where: { email: user.email } });
        if (verificationUser?.id) {
            throw new Error("Email is already being used");
        }

        await this.prismaClient.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: await this.argon2Client.hash(user.password),
                isAccountConfirmed: user.isAccountConfirmed,
            },
        });
    }

    public async login(email: string, password: string): Promise<AuthUserOutputDto> {
        const verificationUser = await this.prismaClient.user.findFirst({ where: { email: email } });
        if (!verificationUser?.id) {
            throw new Error("Authentication failure");
        }

        const token = await this.jsonwebtokenClient.sign({ email: verificationUser?.email }, process.env.JWT_SECRET);
        const isCorrectUser = await this.argon2Client.verify(verificationUser?.password, password);


        if (!isCorrectUser || !token) {
            throw new Error("Authentication failure");
        }
        if (!verificationUser.isAccountConfirmed) {
            throw new Error("Unconfirmed email");
        }
        return { token: token };
    }

    public async changePassword(email: string, password: string): Promise<void> {
        const verificationUser = await this.prismaClient.user.findFirst({ where: { email: email } });
        if (!verificationUser?.id) {
            throw new Error("Failed to change password");
        }

        await this.prismaClient.user.update({
            where: {
                email,
            },
            data: {
                password: await this.argon2Client.hash(password),
            },
        });
    }
}