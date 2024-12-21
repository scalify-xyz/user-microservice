import amqp, { Channel, Connection } from "amqplib";

import { IRabbitMQProvider } from "@infra/interfaces/providers/rabbitmq.interface.provider";

export class RabbitMQProvider implements IRabbitMQProvider {
  private connection!: Connection;
  private channel!: Channel;

  constructor(private readonly uri: string) {}

  static create(uri: string) {
    return new RabbitMQProvider(uri);
}

  async connect(): Promise<void> {
    this.connection = await amqp.connect(this.uri);
    this.channel = await this.connection.createChannel();
  }

  async publish(queue: string, message: object): Promise<void> {
    await this.channel.assertQueue(queue);
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  }

  async close(): Promise<void> {
    await this.channel.close();
    await this.connection.close();
  }
}
