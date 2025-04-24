import { ApiExpress } from "@main/api/express/api.express";
import { env } from "@main/config/env";
import { ApiRoutesFactory } from "@main/factories/api/api.routes.factory";

(async function start(): Promise<void> {
  env();
  const listRoutes = await ApiRoutesFactory.create();
  const api = ApiExpress.create(listRoutes);
  api.start(3000);
})();
