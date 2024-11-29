import { Route } from ".";
import { Api } from "..";
import express, { Express } from "express";


export class ApiExpress implements Api {

    private app: Express;

    private constructor(routes: Route[]) {
        this.app = express();
        this.app.use(express.json());
        this.addRoutes(routes);
    }

    public static create(routes: Route[]) {
        return new ApiExpress(routes);
    }

    private addRoutes(routes: Route[]) {
        routes.forEach(route => {
            const path = route.getPath();
            const method = route.getMethod();
            const handler = route.getHandler();

            this.app[method](path, handler);
        })
    }

    start(port: number): void {
        this.app.listen(port, () => {
            console.log(`Service Running on port ${port}`);
            this.listRoutes();
        })
    }

    private listRoutes() {
        const routes = this.app._router.stack
            .filter((routeObj1: any) => routeObj1.route?.path)
            .map((routeObj2: any) => ({
                path: routeObj2.route?.path,
                method: routeObj2.route?.stack[0].method
            }));

        console.log(routes);
    }
}