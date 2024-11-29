import { prisma } from "./infra/repositories/prisma/package";

import { CreateUserRoute } from "./infra/api/express/routes/create-user.express.route";
import { UserRepositoryPrisma } from "./infra/repositories/prisma/user.repository.prisma";
import { CreateUserUsecase } from "./usecases/create-user/create-user.usecase";
import { ApiExpress } from "./infra/api/express/api.express";

function main() {
    const prismaClient = prisma;

    const userRepository = UserRepositoryPrisma.create(prismaClient);

    const createUserUsecase = CreateUserUsecase.create(userRepository);

    const createUserRoute = CreateUserRoute.create(createUserUsecase);

    const port = 8080;
    const api = ApiExpress.create(
        [createUserRoute]
    )

    api.start(port);
}

main();