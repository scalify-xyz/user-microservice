import { PrismaClient } from "@prisma/client";
import { UserGateway } from "../../../domain/gateway/user.gateway";
import { User } from "../../../domain/entity/user.entity";

export class UserRepositoryPrisma implements UserGateway {
    private constructor(private readonly prismaClient: PrismaClient) { }

    public static create(prismaClient: PrismaClient) {
        return new UserRepositoryPrisma(prismaClient);
    }

    public async save(user: User): Promise<void> {
        await this.prismaClient.user.create({
            data: user
        });
    }
}