import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export class UserModel {
    public user: Prisma.UserDelegate<DefaultArgs>;

    private constructor(prismaClient: PrismaClient) {
        this.user = prismaClient.user;
    }
    static create(prismaClient: PrismaClient) {
        return new UserModel(prismaClient);
    }
}