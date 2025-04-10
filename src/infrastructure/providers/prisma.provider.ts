import { PrismaClient } from "@prisma/client";

export class PrismaProvider {
  private static client: PrismaClient;

  public static create() {
    this.client = new PrismaClient();
    this.execute();
    return this.client;
  }

  private static async execute() {
    try {
      await PrismaProvider.client.$queryRaw`SELECT 1`;
      console.log("Prisma Connected!");
    } catch (error) {
      console.error("Prisma connection Failed");
    }
  }
}
