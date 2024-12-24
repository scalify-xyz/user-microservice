import { Channel, Connection, connect } from "amqplib";

import { IRabbitMQProvider } from "@infra/interfaces/providers/rabbitmq.interface.provider";

export class AmpqProvider implements IRabbitMQProvider {
  private connection!: Connection;
  private channel!: Channel;

  constructor(private readonly uri: string) { }

  static create(uri: string) {
    return new AmpqProvider(uri);
  }

  async connect(): Promise<void> {
    this.connection = await connect(this.uri, { heartbeat: 10 });
    this.connection.on("error", (err) => console.error("RabbitMQ connection error:", err));
    this.connection.on("close", () => console.warn("RabbitMQ connection closed!"));
    this.channel = await this.connection.createChannel();
    console.log("RabbitMQ Connected!");
  }

  private async ensureConnection(): Promise<void> {
    if (!this.connection || !this.channel) {
      throw new Error("RabbitMQ connection is not established.");
    }
  }

  async publish(queue: string, message: object): Promise<void> {
    await this.ensureConnection();
    await this.channel.assertQueue(queue);
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  }
}
