import { UserEntity } from "@domain/entity/user.entity";

import { CreateUserDTO } from "@application/usecases/create-user/create-user.schema";

import { UserPrismaModel } from "@infrastructure/models/prisma/user.model.prisma";

export class UserRepository {
  private constructor(private readonly userModel: UserPrismaModel) {}

  public static create(userModel: UserPrismaModel) {
    return new UserRepository(userModel);
  }

  public async create(dto: CreateUserDTO) {
    const userEntity = UserEntity.create({
      ...dto,
    });

    await this.userModel.create({
      data: {
        id: userEntity.id,
        name: userEntity.name,
        email: userEntity.email,
        password: userEntity.password,
        isEmailVerified: userEntity.isEmailVerified,
      },
    });

    return userEntity;
  }

  public async findAll() {
    const users = await this.userModel.findMany();
    return users.map((user) => UserEntity.create(user));
  }

  public async findById(id: string) {
    const user = await this.userModel.findUnique({ where: { id } });
    if (!user?.id) throw new Error("User not found");
    return UserEntity.create(user);
  }

  public async findByEmail(email: string) {
    const user = await this.userModel.findUnique({ where: { email } });
    if (!user?.id) throw new Error("User not found");
    return UserEntity.create(user);
  }
}
