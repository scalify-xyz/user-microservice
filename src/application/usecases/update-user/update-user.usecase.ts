import { TUserEntityWithoutPassword } from "@domain/entity/user.entity";

import { UserRepository } from "@infrastructure/repositories/user.repository";

import { UpdateUserDTO } from "./update-user.schema";

export class UpdateUserUsecase {
  private constructor(private readonly userRepository: UserRepository) {}

  public static create(userRepository: UserRepository) {
    return new UpdateUserUsecase(userRepository);
  }

  public async execute(
    id: string,
    dto: UpdateUserDTO,
  ): Promise<TUserEntityWithoutPassword> {
    const output = await this.userRepository.update(id, dto);
    return output.toJSON();
  }
}
