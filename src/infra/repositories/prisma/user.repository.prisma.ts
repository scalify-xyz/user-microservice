import { PrismaClient } from "@prisma/client";
import { Argon2Package } from "../argon2/package";

import { UserGateway } from "../../../domain/gateway/user.gateway";
import { User } from "../../../domain/entity/user.entity";
import { jsonwebtokenPackage } from "../jsonwebtoken/package";
import { AuthUserOutputDto } from "../../../usecases/auth-user/auth-user.usecase";


export class UserRepositoryPrisma implements UserGateway {
    private constructor(
        private readonly prismaClient: PrismaClient,
        private readonly argon2Client: Argon2Package,
        private readonly jsonwebtokenClient: jsonwebtokenPackage,
    ) { }

    public static create(
        prismaClient: PrismaClient,
        argon2Client: Argon2Package,
        jsonwebtokenClient: jsonwebtokenPackage
    ) {
        return new UserRepositoryPrisma(prismaClient, argon2Client, jsonwebtokenClient);
    }

    public async save(user: User): Promise<void> {
        try {
            const verificationUser = await this.prismaClient.user.findFirst({ where: { email: user.email } });
            if (!!verificationUser?.id) {
                throw new Error("Email is already being used")
            }

            await this.prismaClient.user.create({
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    password: await this.argon2Client.hash(user.password),
                    isAccountConfirmed: user.isAccountConfirmed,
                }
            });
        } catch (error) {
            throw new Error(error.message)
        }

    }

    public async login(email: string, password: string): Promise<AuthUserOutputDto> {
        const verificationUser = await this.prismaClient.user.findFirst({ where: { email: email } });
        const token = await this.jsonwebtokenClient.sign({ email: verificationUser.email }, process.env.JWT_SECRET);
        const isCorrectUser = await this.argon2Client.verify(verificationUser.password, password);

        if (!verificationUser?.id || !isCorrectUser || !token) {
            throw new Error("Authentication failure")
        }
        if (!verificationUser.isAccountConfirmed) {
            throw new Error("Unconfirmed email")
        }
        return { token: token };
    }

    public async changePassword(email: string, password: string): Promise<void> {
        const verificationUser = await this.prismaClient.user.findFirst({ where: { email: email } });
        if (!verificationUser?.id) {
            throw new Error("Failed to change password")
        }

        await this.prismaClient.user.update({
            where: {
                email
            }, 
            data: {
                password: await this.argon2Client.hash(password)
            }
        })
    }
}