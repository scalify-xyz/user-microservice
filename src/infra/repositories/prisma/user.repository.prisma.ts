import { PrismaClient } from "@prisma/client";
import { UserGateway } from "../../../domain/gateway/user.gateway";
import { User } from "../../../domain/entity/user.entity";
import { hash } from "argon2";


export class UserRepositoryPrisma implements UserGateway {
    private constructor(private readonly prismaClient: PrismaClient) { }

    public static create(prismaClient: PrismaClient) {
        return new UserRepositoryPrisma(prismaClient);
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
                    password: await hash(user.password),
                    isAccountConfirmed: user.isAccountConfirmed,
                }
            });
        } catch (error) {
            throw new Error("Error registering user")
        }

    }
}