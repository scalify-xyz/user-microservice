import { AWSSecretsManager } from "@scalify/shared-microservice";

export async function env() {
  await AWSSecretsManager.create({
    region: "sa-east-1",
    secretsMap: {
      JWT_SECRET: "jwt/production/scalableecommerce",
      POSTGRESDB_URL: "postgresdb/production/scalableecommerce",
      RABBITMQ_URL: "rabbitmq/production/scalableecommerce",
    },
  });
}
