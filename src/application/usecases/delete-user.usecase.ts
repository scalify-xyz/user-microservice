import { TUserEntityWithoutPassword } from "@domain/entity/user.entity";

import { UserRepository } from "@infrastructure/repositories/user.repository";

export class DeleteUserUsecase {
  private constructor(private readonly userRepository: UserRepository) {}

  public static create(userRepository: UserRepository) {
    return new DeleteUserUsecase(userRepository);
  }

  public async execute(id: string): Promise<TUserEntityWithoutPassword> {
    const output = await this.userRepository.findById(id);
    return output.toJSON();
  }
}
