import { UserRepository } from "@infrastructure/repositories/user.repository";

import { UserPrismaModelFactory } from "../models/prisma/user.model.prisma.factory";

export class UserRepositoryFactory {
  static create(): UserRepository {
    return UserRepository.create(UserPrismaModelFactory.create());
  }
}
