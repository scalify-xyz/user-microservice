import { UserRepository } from "@infrastructure/repositories/user.repository";

export class GetUserUsecase {
  private constructor(private readonly userRepository: UserRepository) {}

  public static create(userRepository: UserRepository) {
    return new GetUserUsecase(userRepository);
  }

  public async execute(id: string) {
    const output = await this.userRepository.findById(id);
    return output;
  }
}
