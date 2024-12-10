import { NextFunction, Request, Response } from "express";

import { IJsonWebTokenGatewayProvider } from "@infra/interfaces/providers/jsonwebtoken.interface.provider";

import CleanBearerToken from "@shared/utils/clean-bearer-token.util";

export const AuthenticationMiddleware = (jsonwebtokenClient: IJsonWebTokenGatewayProvider) => {
    return function (request: Request, response: Response, next: NextFunction): void {
        const bearerToken = request.headers["authorization"];
        if (!bearerToken) {
            throw new Error("Unauthorized");
        }

        const token = CleanBearerToken.create(bearerToken).getToken();
        const verifiedToken = jsonwebtokenClient.verify(token, process.env.JWT_SECRET, {});

        if (!verifiedToken?.email) {
            throw new Error("Unauthorized");
        }

        response.locals.userEmail = verifiedToken?.email;
        next();
    };
};