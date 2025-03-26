import { Channel, Connection, connect } from "amqplib";

import { IRabbitMQProvider } from "@infrastructure/interfaces/providers/rabbitmq.interface.provider";

export class AmpqProvider implements IRabbitMQProvider {
  private connection!: Connection;
  private channel!: Channel;

  constructor(private readonly uri: string) { }

  static create(uri: string) {
    return new AmpqProvider(uri);
  }

  async connect(): Promise<void> {
    try {
      // this.connection = await connect(this.uri, { heartbeat: 10 });
      // this.channel = await this.connection.createChannel();
      console.log("RabbitMQ Connected!");
    } catch (error) {
      console.error("RabbitMQ connection Failed");
    }
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
