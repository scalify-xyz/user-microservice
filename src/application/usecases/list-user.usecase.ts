import { UserRepository } from "@infrastructure/repositories/user.repository";

export class ListUserUsecase {
  private constructor(private readonly userRepository: UserRepository) {}

  public static create(userRepository: UserRepository) {
    return new ListUserUsecase(userRepository);
  }

  public async execute() {
    const output = await this.userRepository.findAllUsers();
    return output.map((user) => user.toJSON());
  }
}
