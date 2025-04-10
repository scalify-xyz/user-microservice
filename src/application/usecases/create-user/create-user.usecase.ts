import { UserRepository } from "@infrastructure/repositories/user.repository";

import { CreateUserDTO } from "./create-user.schema";
import { TUserEntityWithoutPassword } from "@domain/entity/user.entity";

export class CreateUserUsecase {
  private constructor(private readonly userRepository: UserRepository) {}

  public static create(userRepository: UserRepository) {
    return new CreateUserUsecase(userRepository);
  }

  public async execute({
    name,
    email,
    password,
  }: CreateUserDTO): Promise<TUserEntityWithoutPassword> {
    const verificationUser = await this.userRepository.findByEmail(email);
    if (verificationUser?.id) {
      throw new Error("Email is already being used");
    }

    const output = await this.userRepository.createUser({
      name,
      email,
      password,
    });

    return output;
  }
}
