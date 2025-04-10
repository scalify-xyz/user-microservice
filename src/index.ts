import { AWSSecretsManager } from "@scalify/shared-microservice";

import { ApiExpress } from "@main/api/express/api.express";
import { ApiRoutesFactory } from "@main/factories/api/api.routes.factory";

async function start(): Promise<void> {
  await AWSSecretsManager.create({
    region: "sa-east-1",
    secretsMap: {
      JWT_SECRET: "jwt/production/scalableecommerce",
      POSTGRESDB_URL: "postgresdb/production/scalableecommerce",
      RABBITMQ_URL: "rabbitmq/production/scalableecommerce",
    },
  });
  const api = ApiExpress.create(await ApiRoutesFactory.create());
  api.start(3000);
}

start();
