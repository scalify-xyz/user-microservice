import { PrismaClient } from "@prisma/client";
import { Argon2Package } from "../argon2/package";

import { UserGateway } from "../../../domain/gateway/user.gateway";
import { User } from "../../../domain/entity/user.entity";


export class UserRepositoryPrisma implements UserGateway {
    private constructor(private readonly prismaClient: PrismaClient, private readonly argon2Client: Argon2Package) { }

    public static create(prismaClient: PrismaClient, argon2Client: Argon2Package) {
        return new UserRepositoryPrisma(prismaClient, argon2Client);
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
            throw new Error("Error registering user")
        }

    }

    public async login(email: string, password: string): Promise<void> {
        const verificationUser = await this.prismaClient.user.findFirst({ where: { email: email } });
        if (!verificationUser?.id || await !this.argon2Client.verify(verificationUser.password, password)) {
            throw new Error("Authentication failure")
        }
        return;
    }
}