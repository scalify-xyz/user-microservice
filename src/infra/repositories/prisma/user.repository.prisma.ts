import { PrismaClient } from "@prisma/client";

import { User } from "@domain/entity/user.entity";
import { IUserRepository, SaveResponseDTO } from "@domain/interfaces/repositories/user.interface.repository";

import { IEncryptProvider } from "@infra/interfaces/providers/encrypt.interface.provider";


export class UserRepositoryPrisma implements IUserRepository {
    private constructor(
        private readonly prismaClient: PrismaClient,
        private readonly encryptClient: IEncryptProvider,
    ) { }

    public static create(
        prismaClient: PrismaClient,
        encryptClient: IEncryptProvider,
    ) {
        return new UserRepositoryPrisma(prismaClient, encryptClient);
    }

    public async save(user: User): Promise<SaveResponseDTO> {
        const verificationUser = await this.prismaClient.user.findFirst({ where: { email: user.email } });
        if (verificationUser?.id) {
            throw new Error("Email is already being used");
        }

        await this.prismaClient.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: await this.encryptClient.hash(user.password),
                isAccountConfirmed: user.isAccountConfirmed,
            },
        });

        return { id: user.id };
    }

    public async findByEmail(email: string) {
        const user = await this.prismaClient.user.findFirst({ where: { email } });
        if (!user?.id) {
            throw new Error("Cannot find user");
        }
        
        return User.create({ id: user.id, name: user.name, email: user.email, password: user.password });
    }

    public async updatePassword(id: string, password: string): Promise<void> {
        await this.prismaClient.user.update({
            where: { id: id },
            data: { password },
        });
    }
}