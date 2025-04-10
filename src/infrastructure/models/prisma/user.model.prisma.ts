import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export class UserPrismaModel {
  private prismaUser: Prisma.UserDelegate<DefaultArgs>;

  private constructor(prismaClientUser: Prisma.UserDelegate<DefaultArgs>) {
    this.prismaUser = prismaClientUser;
  }

  public static create(prismaClientUser: Prisma.UserDelegate<DefaultArgs>) {
    return new UserPrismaModel(prismaClientUser);
  }

  public findUnique(args: Prisma.UserFindUniqueArgs) {
    return this.prismaUser.findUnique(args);
  }

  public findUniqueOrThrow(args: Prisma.UserFindUniqueOrThrowArgs) {
    return this.prismaUser.findUniqueOrThrow(args);
  }

  public findFirst(args: Prisma.UserFindFirstArgs) {
    return this.prismaUser.findFirst(args);
  }

  public findFirstOrThrow(args: Prisma.UserFindFirstOrThrowArgs) {
    return this.prismaUser.findFirstOrThrow(args);
  }

  public findMany(args?: Prisma.UserFindManyArgs) {
    return this.prismaUser.findMany(args);
  }

  public create(args: Prisma.UserCreateArgs) {
    return this.prismaUser.create(args);
  }

  public createMany(args: Prisma.UserCreateManyArgs) {
    return this.prismaUser.createMany(args);
  }

  public update(args: Prisma.UserUpdateArgs) {
    return this.prismaUser.update(args);
  }

  public updateMany(args: Prisma.UserUpdateManyArgs) {
    return this.prismaUser.updateMany(args);
  }

  public upsert(args: Prisma.UserUpsertArgs) {
    return this.prismaUser.upsert(args);
  }

  public delete(args: Prisma.UserDeleteArgs) {
    return this.prismaUser.delete(args);
  }

  public deleteMany(args: Prisma.UserDeleteManyArgs) {
    return this.prismaUser.deleteMany(args);
  }

  public count(args?: Prisma.UserCountArgs) {
    return this.prismaUser.count(args);
  }

  public aggregate(args: Prisma.UserAggregateArgs) {
    return this.prismaUser.aggregate(args);
  }
}
