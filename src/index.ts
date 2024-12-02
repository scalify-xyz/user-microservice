import { prisma } from "./infra/repositories/prisma/package";
import { argon2Package } from "./infra/repositories/argon2/package";

import { CreateUserRoute } from "./infra/api/express/routes/create-user.express.route";
import { AuthUserRoute } from "./infra/api/express/routes/auth-user.express.route";
import { UserRepositoryPrisma } from "./infra/repositories/prisma/user.repository.prisma";
import { CreateUserUsecase } from "./usecases/create-user/create-user.usecase";
import { AuthUserUsecase } from "./usecases/auth-user/auth-user.usecase";
import { ApiExpress } from "./infra/api/express/api.express";

function main() {
    const prismaClient = prisma;
    const argon2Client = argon2Package;

    const userRepository = UserRepositoryPrisma.create(prismaClient, argon2Client);

    const createUserUsecase = CreateUserUsecase.create(userRepository);
    const authUserUsecase = AuthUserUsecase.create(userRepository);

    const createUserRoute = CreateUserRoute.create(createUserUsecase);
    const authUserRoute = AuthUserRoute.create(authUserUsecase);

    const port = 8080;
    const api = ApiExpress.create(
        [createUserRoute, authUserRoute]
    )

    api.start(port);
}

main();