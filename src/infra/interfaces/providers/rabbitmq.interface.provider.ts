export type IRabbitMQProvider = {
    connect(): Promise<void>;
    publish(queue: string, message: object): Promise<void>;
    close(): Promise<void>;
  }