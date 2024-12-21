
# user-microservice

This is a **User Microservice** built with **TypeScript**, **Node.js**, **Prisma**, following **DDD** and **Clean Code** principles, and using **Docker Compose** for database setup.

## Project Structure

```
src/
├── Infra/        # Database implementation and external communication
├── Application/  # Application logic and use cases
├── Domain/       # Entities and domain rules
├── Shared/       # Utility Shared functions and helpers
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/username/user-microservice.git
cd user-microservice
```

1. Setup Husky:

```bash
npm run prepare
```

2. Install dependencies:

```bash
npm install
```

3. Set up the database with Docker Compose:

```bash
docker-compose up --build
```

4. Apply Prisma migrations:

```bash
npx prisma migrate dev
```

## Run the Service

Start the microservice:

```bash
npm run dev
```

The service will be available at `http://localhost:3000`.

## Docker Commands

- To stop and remove the containers:

```bash
docker-compose down
```

## Contributing

1. Fork the repository.
2. Create a branch for your feature (`git checkout -b feature/feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push the branch (`git push origin feature/feature-name`).
5. Create a Pull Request.

## License

Licensed under the [MIT License](LICENSE).