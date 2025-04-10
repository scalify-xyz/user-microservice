import { UserEntity } from "@domain/entity/user.entity";

import { CreateUserDTO } from "@application/usecases/create-user/create-user.schema";

import { UserPrismaModel } from "@infrastructure/models/prisma/user.model.prisma";

export class UserRepository {
  private constructor(private readonly userModel: UserPrismaModel) {}

  public static create(userModel: UserPrismaModel) {
    return new UserRepository(userModel);
  }

  public async createUser({ name, email, password }: CreateUserDTO) {
    const user = UserEntity.create({ name, email, password });
    await this.userModel.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        isEmailVerified: user.isEmailVerified,
      },
    });

    return user;
  }

  public async findAllUsers() {
    const users = await this.userModel.findMany();

    return users.map((user) =>
      UserEntity.create({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        isEmailVerified: user.isEmailVerified,
      }),
    );
  }

  public async findById(id: string) {
    const user = await this.userModel.findUnique({ where: { id } });
    if (!user?.id) {
      return null;
    }

    return UserEntity.create({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      isEmailVerified: user.isEmailVerified,
    });
  }

  public async findByEmail(email: string) {
    const user = await this.userModel.findUnique({ where: { email } });
    if (!user?.id) {
      return null;
    }

    return UserEntity.create({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }

  public async updatePassword(id: string, password: string): Promise<void> {
    await this.userModel.update({
      where: { id: id },
      data: { password },
    });
  }
}
