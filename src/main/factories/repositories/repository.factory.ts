import { UserModel } from "@infrastructure/models/user.model";
import { PrismaProvider } from "@infrastructure/providers/prisma.provider";
import { UserRepository } from "@infrastructure/repositories/prisma/user.repository.prisma";

export class UserRepositoryFactory {
  static create(): UserRepository {
    return UserRepository.create(UserModel.create(PrismaProvider.create()));
  }
}
