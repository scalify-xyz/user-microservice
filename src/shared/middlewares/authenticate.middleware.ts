import { NextFunction, Request, Response } from "express";

import { IJsonWebTokenGatewayProvider } from "@domain/gateway/providers/jsonwebtoken.gateway.provider";

import CleanBearerToken from "@shared/utils/CleanBearerToken";

export const AuthenticateMiddleware = (jsonwebtokenClient: IJsonWebTokenGatewayProvider) => {
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