import amqp, { Connection, Channel } from "amqplib/callback_api";

export class RabbitMQProvider {
  private connection!: Connection;
  private channel!: Channel;


  private constructor(url: string) {
    this.connect(url);
  }

  static create(url: string) {
    return new RabbitMQProvider(url);
  }

  private async connect(url: string): Promise<void> {
    this.connection = await new Promise<Connection>((resolve, reject) => {
      amqp.connect(url, (err, conn) => {
        if (err) reject(err);
        else resolve(conn);
      });
    });
    this.channel = await new Promise<Channel>((resolve, reject) => {
      this.connection.createChannel((err, channel) => {
        if (err) reject(err);
        else resolve(channel);
      });
    });
  }

  async publish(queue: string, message: object): Promise<void> {
    await this.channel.assertQueue(queue);
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  }

  async consume(queue: string, callback: (message: object) => void): Promise<void> {
    await this.channel.assertQueue(queue);
    this.channel.consume(queue, (msg) => {
      if (msg) {
        callback(JSON.parse(msg.content.toString()));
        this.channel.ack(msg);
      }
    });
  }
}
