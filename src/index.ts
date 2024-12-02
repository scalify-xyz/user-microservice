import { prisma } from "./infra/repositories/prisma/package";
import { argon2Package } from "./infra/repositories/argon2/package";
import { jsonwebtokenPackage } from "./infra/repositories/jsonwebtoken/package";

import { UserRepositoryPrisma } from "./infra/repositories/prisma/user.repository.prisma";

import { CreateUserUsecase } from "./usecases/create-user/create-user.usecase";
import { AuthUserUsecase } from "./usecases/auth-user/auth-user.usecase";
import { ChangePasswordUserUsecase } from "./usecases/change-password-user/change-password-user.usecase";

import { CreateUserRoute } from "./infra/api/express/routes/create-user.express.route";
import { AuthUserRoute } from "./infra/api/express/routes/auth-user.express.route";
import { ChangePasswordUserRoute } from "./infra/api/express/routes/change-password-user.express.route";

import { ApiExpress } from "./infra/api/express/api.express";



function configurationRoutes() {
    const prismaClient = prisma;
    const argon2Client = argon2Package;
    const jsonwebtokenClient = jsonwebtokenPackage;

    const userRepository = UserRepositoryPrisma.create(
        prismaClient,
        argon2Client,
        jsonwebtokenClient
    );

    const createUserUsecase = CreateUserUsecase.create(userRepository);
    const authUserUsecase = AuthUserUsecase.create(userRepository);
    const changePasswordUserUsecase = ChangePasswordUserUsecase.create(userRepository);
    
    const createUserRoute = CreateUserRoute.create(createUserUsecase);
    const authUserRoute = AuthUserRoute.create(authUserUsecase);
    const changePasswordUserRoute = ChangePasswordUserRoute.create(changePasswordUserUsecase, jsonwebtokenClient);

    return [createUserRoute, authUserRoute, changePasswordUserRoute]
}


(function start() {
    const routes = configurationRoutes();
    const port = 8080;
    const api = ApiExpress.create(routes)

    api.start(port);
})();


