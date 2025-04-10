import { RabbitMQProvider } from "@scalify/shared-microservice";

import { CreateUserDTO } from "@application/usecases/create-user/create-user.schema";
import { CreateUserUsecase } from "@application/usecases/create-user/create-user.usecase";

import { Argon2Provider } from "@infrastructure/providers/argon2.provider";

import {
  TExpressNext,
  TExpressRequest,
  TExpressResponse,
} from "@main/api/express/routes/interfaces/route.interface";

const RABBITMQ_QUEUE_NAME = "notifications";

export class CreateUserController {
  private constructor(
    private readonly createUserUseCase: CreateUserUsecase,
    private readonly encryptProvider: Argon2Provider,
    private readonly rabbitMqProvider: RabbitMQProvider,
  ) {}

  public static create(
    createUserUseCase: CreateUserUsecase,
    encryptProvider: Argon2Provider,
    rabbitMqProvider: RabbitMQProvider,
  ) {
    return new CreateUserController(
      createUserUseCase,
      encryptProvider,
      rabbitMqProvider,
    );
  }

  public execute = async (
    request: TExpressRequest,
    response: TExpressResponse,
    next: TExpressNext,
  ) => {
    try {
      const { name, email, password } = request.body;

      if (password.length < 5) {
        throw new Error("Password is too weak");
      }

      const input: CreateUserDTO = {
        name,
        email,
        password: await this.encryptProvider.hash(password),
      };

      const output = await this.createUserUseCase.execute(input);

      this.rabbitMqProvider.publish(RABBITMQ_QUEUE_NAME, {
        message: "USER_CREATE",
        provider: "email",
        userId: output.id,
      });

      response.status(201).json(output);
    } catch (error) {
      next(error);
    }
  };
}
