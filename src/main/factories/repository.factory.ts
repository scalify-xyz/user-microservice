import { UserModel } from "@infrastructure/models/user.model";
import { PrismaProvider } from "@infrastructure/providers/prisma.provider";
import { UserRepository } from "@infrastructure/repositories/prisma/user.repository.prisma";

export class UserRepositoryFactory {
    static create(): UserRepository {
        const prisma = PrismaProvider.create();
        const userModel = UserModel.create(prisma);
        return UserRepository.create(userModel);
    }
}
