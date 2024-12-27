import { PrismaClient } from "@prisma/client";

export class PrismaProvider {

    static client;
    static create() {
        this.client = new PrismaClient();
        this.connection();
        return this.client;
    }

    static async connection() {
        try {
            await PrismaProvider.client.$queryRaw`SELECT 1`;
        } catch (error) {
            console.error("Prisma Connection Failed");
        }
    }
}
