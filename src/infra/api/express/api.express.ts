import express, { Express } from "express";
// eslint-disable-next-line import/no-unresolved
import { ILayer } from "express-serve-static-core";

import { ErrorHandlerMiddleware } from "@exceptions/index";

import { Api } from "..";

import { Route } from ".";

export class ApiExpress implements Api {
    private app: Express;

    private constructor(routes: Route[]) {
        this.app = express();
        this.app.use(express.json());
        this.setupRoutes(routes);
    }

    public static create(routes: Route[]) {
        return new ApiExpress(routes);
    }

    private setupRoutes(routes: Route[]) {
        routes.forEach((route) => {
            const path = route.getPath();
            const method = route.getMethod();
            const middleware = route?.getMiddleware && route?.getMiddleware();
            const handler = route.getHandler();

            if (middleware) {
                this.app[method](path, middleware, handler);
            } else {
                this.app[method](path, handler);
            }
        });

        // Add Middleware
        this.app.use(ErrorHandlerMiddleware);
    }

    start(port: number): void {
        this.app.listen(port, () => {
            console.log(`Service Running on port ${port}`);
            this.listRoutes();
        });
    }

    private listRoutes() {
        const routes = this.app._router.stack
            .filter((routeObj1: ILayer) => routeObj1.route?.path)
            .map((routeObj2: ILayer) => ({
                path: routeObj2.route?.path,
                method: routeObj2.route?.stack[0].method,
            }));

        console.log(routes);
    }
}
