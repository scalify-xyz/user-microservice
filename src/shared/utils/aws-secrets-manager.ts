import "dotenv/config";

import {
  SecretsManagerClient,
  GetSecretValueCommand,
  GetSecretValueCommandOutput,
  GetSecretValueCommandInput,
} from "@aws-sdk/client-secrets-manager";

interface SecretsManagerConfig {
  region?: string;
  secretsMap: Record<string, string>;
}

export default class AWSSecretsManager {
  private client: SecretsManagerClient;
  private secretsMap: Record<string, string>;

  constructor(config: SecretsManagerConfig) {
    this.client = new SecretsManagerClient({ region: config.region || "sa-east-1" });
    this.secretsMap = config.secretsMap;
  }

  static async create(config: SecretsManagerConfig): Promise<AWSSecretsManager> {
    const secretsManager = new AWSSecretsManager(config);
    await secretsManager.loadSecrets();
    return secretsManager;
  }

  async loadSecrets(): Promise<void> {
    if (process.env.NODE_ENV === "prod") {
      console.log("Production environment detected. Loading AWS SDK...");
      for (const [envKey, secretId] of Object.entries(this.secretsMap)) {
        await this.fetchAndSetSecret(envKey, secretId);
      }
    } else {
      console.log("Development environment detected. Using local process.env.");
    }
  }

  private async fetchAndSetSecret(envKey: string, secretId: string): Promise<void> {
    try {
      const response: GetSecretValueCommandOutput = await this.client.send(
        new GetSecretValueCommand({
          SecretId: secretId,
          VersionStage: "AWSCURRENT",
        } as GetSecretValueCommandInput),
      );

      console.log(`Secret ${envKey} loaded successfully.`);
      const secretValue = response.SecretString ? JSON.parse(response.SecretString) : null;
      if (secretValue && typeof secretValue === "object") {
        process.env[envKey] = secretValue[envKey] as string || secretValue as string;
      }
    } catch (error) {
      console.error(`Failed to fetch secret for ${envKey}:`, error);
    }
  }
}
