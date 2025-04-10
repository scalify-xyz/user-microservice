import { UserEntity } from "@domain/entity/user.entity";

import { CreateUserDTO } from "@application/usecases/create-user/create-user.schema";

import { UserModel } from "@infrastructure/models/user.model";

export class UserRepository {
  private constructor(private readonly userModel: UserModel) {}

  public static create(userModel: UserModel) {
    return new UserRepository(userModel);
  }

  public async createUser({ name, email, password }: CreateUserDTO) {
    const user = UserEntity.create({ name, email, password });
    await this.userModel.user.create({
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
    const users = await this.userModel.user.findMany();

    return users.map((user) =>
      UserEntity.create({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
      }),
    );
  }

  public async findById(id: string) {
    const user = await this.userModel.user.findFirst({ where: { id } });
    if (!user?.id) {
      return null;
    }

    return UserEntity.create({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    }).toJSON();
  }

  public async findByEmail(email: string) {
    const user = await this.userModel.user.findFirst({ where: { email } });
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
    await this.userModel.user.update({
      where: { id: id },
      data: { password },
    });
  }
}
