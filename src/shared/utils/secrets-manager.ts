import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

export enum Keys {
  POSTGRES_URL = "POSTGRES_URL",
  RABBITMQ_URL = "RABBITMQ_URL",
  JWT_SECRET = "JWT_SECRET",
}

const AWS_MAP_KEYS = {
  [Keys.POSTGRES_URL]: "postgres/production/scalableecommerce",
  [Keys.RABBITMQ_URL]: "rabbitmq/production/scalableecommerce",
  [Keys.JWT_SECRET]: "jwt/production/scalableecommerce",
};

export default class SecretsManager {
  private client: SecretsManagerClient;

  constructor(region: string = "sa-east-1") {
    this.client = new SecretsManagerClient({ region });
  }

  static create() {
    return new SecretsManager().loadSecrets();
  }

  async loadSecrets(): Promise<void> {
    if (process.env.NODE_ENV === "prod") {
      console.log("Production environment detected. Loading aws sdk");
      for (const [envKey, secretId] of Object.entries(AWS_MAP_KEYS)) {
        try {
          const response = await this.client.send(
            new GetSecretValueCommand({
              SecretId: secretId,
              VersionStage: "AWSCURRENT",
            }),
          );

          console.log(`Secret ${envKey} loaded successfully.`);
          const secretValue = response.SecretString && JSON.parse(response.SecretString);
          process.env[envKey] = secretValue[envKey] || secretValue;
        } catch (error) {
          console.error(`Failed to fetch secret for ${envKey}:`);
        }
      }
    } else {
      console.log("Development environment detected. Using local process.env.");
    }
  }
}
