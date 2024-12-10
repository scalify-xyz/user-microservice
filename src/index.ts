import { PrismaClient } from "@prisma/client";

import { AuthUserUsecase } from "@usecases/auth-user/auth-user.usecase";
import { ChangePasswordUserUsecase } from "@usecases/change-password-user/change-password-user.usecase";
import { CreateUserUsecase } from "@usecases/create-user/create-user.usecase";

import { ApiExpress } from "@infra/api/express/api.express";
import { AuthUserRoute } from "@infra/api/express/routes/auth-user.express.route";
import { ChangePasswordUserRoute } from "@infra/api/express/routes/change-password-user.express.route";
import { CreateUserRoute } from "@infra/api/express/routes/create-user.express.route";
import { Argon2Provider } from "@infra/providers/argon2.provider";
import { JsonWebTokenProvider } from "@infra/providers/jsonwebtoken.provider";
import { UserRepositoryPrisma } from "@infra/repositories/prisma/user.repository.prisma";




export function configurationRoutes() {
    const prismaClient = new PrismaClient();
    const argon2Client = new Argon2Provider();
    const jsonwebtokenClient = new JsonWebTokenProvider();

    const userRepository = UserRepositoryPrisma.create(
        prismaClient,
        argon2Client,
        jsonwebtokenClient,
    );

    const createUserUsecase = CreateUserUsecase.create(userRepository);
    const authUserUsecase = AuthUserUsecase.create(userRepository);
    const changePasswordUserUsecase = ChangePasswordUserUsecase.create(userRepository);

    const createUserRoute = CreateUserRoute.create(createUserUsecase);
    const authUserRoute = AuthUserRoute.create(authUserUsecase);
    const changePasswordUserRoute = ChangePasswordUserRoute.create(changePasswordUserUsecase, jsonwebtokenClient);

    return [createUserRoute, authUserRoute, changePasswordUserRoute];
}


(function start() {
    const routes = configurationRoutes();
    const port = 8080;
    const api = ApiExpress.create(routes);

    api.start(port);
})();


