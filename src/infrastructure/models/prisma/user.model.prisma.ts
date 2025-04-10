import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export class UserPrismaModel {
  private prismaUser: Prisma.UserDelegate<DefaultArgs>;

  private constructor(prismaClient: PrismaClient) {
    this.prismaUser = prismaClient.user;
  }

  static create(prismaClient: PrismaClient) {
    return new UserPrismaModel(prismaClient);
  }

  findUnique(args: Prisma.UserFindUniqueArgs) {
    return this.prismaUser.findUnique(args);
  }

  findUniqueOrThrow(args: Prisma.UserFindUniqueOrThrowArgs) {
    return this.prismaUser.findUniqueOrThrow(args);
  }

  findFirst(args: Prisma.UserFindFirstArgs) {
    return this.prismaUser.findFirst(args);
  }

  findFirstOrThrow(args: Prisma.UserFindFirstOrThrowArgs) {
    return this.prismaUser.findFirstOrThrow(args);
  }

  findMany(args?: Prisma.UserFindManyArgs) {
    return this.prismaUser.findMany(args);
  }

  create(args: Prisma.UserCreateArgs) {
    return this.prismaUser.create(args);
  }

  createMany(args: Prisma.UserCreateManyArgs) {
    return this.prismaUser.createMany(args);
  }

  update(args: Prisma.UserUpdateArgs) {
    return this.prismaUser.update(args);
  }

  updateMany(args: Prisma.UserUpdateManyArgs) {
    return this.prismaUser.updateMany(args);
  }

  upsert(args: Prisma.UserUpsertArgs) {
    return this.prismaUser.upsert(args);
  }

  delete(args: Prisma.UserDeleteArgs) {
    return this.prismaUser.delete(args);
  }

  deleteMany(args: Prisma.UserDeleteManyArgs) {
    return this.prismaUser.deleteMany(args);
  }

  count(args?: Prisma.UserCountArgs) {
    return this.prismaUser.count(args);
  }

  aggregate(args: Prisma.UserAggregateArgs) {
    return this.prismaUser.aggregate(args);
  }
}