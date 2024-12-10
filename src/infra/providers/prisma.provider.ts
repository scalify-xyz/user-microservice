import { PrismaClient } from "@prisma/client";

export class PrismaProvider {
    static create() {
        return new PrismaClient();
    }
}
