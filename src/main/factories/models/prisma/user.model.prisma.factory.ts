import { UserPrismaModel } from "@infrastructure/models/prisma/user.model.prisma";
import { PrismaProvider } from "@infrastructure/providers/prisma.provider";

export class UserPrismaModelFactory {
  static create(): UserPrismaModel {
    return UserPrismaModel.create(PrismaProvider.create());
  }
}
