import { PrismaClient } from "@prisma/client";

export class PrismaProvider {
  static client: PrismaClient;

  static create() {
    this.client = new PrismaClient();
    this.execute();
    return this.client;
  }

  static async execute() {
    try {
      await PrismaProvider.client.$queryRaw`SELECT 1`;
      console.log("Prisma Connected!");
    } catch (error) {
      console.error("Prisma connection Failed");
    }
  }
}
