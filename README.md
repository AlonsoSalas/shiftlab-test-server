# ShiftLab Technical Assesment

## API Server

This NestJS server provides APIs for managing courses, results, and students.

## Project structure

```bash
├── src/ # Source files
│ ├── courses/ # Courses module
│ │ ├── controllers/ # Controllers for courses module
│ │ ├── dto/ # Data transfer objects for courses module
│ │ ├── entities/ # Entities for courses module
│ │ ├── services/ # Services for courses module
│ │ └── courses.module.ts # Courses module entry file
│ ├── results/ # Results module
│ │ ├── controllers/ # Controllers for results module
│ │ ├── dto/ # Data transfer objects for results module
│ │ ├── entities/ # Entities for results module
│ │ ├── services/ # Services for results module
│ │ └── results.module.ts # Results module entry file
│ ├── students/ # Students module
│ │ ├── controllers/ # Controllers for students module
│ │ ├── dto/ # Data transfer objects for students module
│ │ ├── entities/ # Entities for students module
│ │ ├── services/ # Services for students module
│ │ └── students.module.ts # Students module entry file
│ ├── app.module.ts # Main application module
│ └── main.ts # Application entry file
├── Dockerfile # Docker configuration file
├── docker-compose.yml # Docker Compose configuration file
└── README.md # Project README file
```

## Tech

- [Nestjs](https://docs.nestjs.com/) - A framework built with TypeScript for building efficient, reliable, and scalable server-side applications. It provides a structured and organized architecture for developing APIs.
- [Postgres](https://www.postgresql.org/) - A powerful, open-source relational database management system (RDBMS) known for its reliability, robustness, and feature-rich capabilities. It is used as the database for storing and managing application data.
- [Typescript](https://www.typescriptlang.org/) - A superset of JavaScript that adds static typing and other features to enhance the development experience and improve code quality. It allows developers to catch errors early and write more maintainable code.
- [Docker](https://www.docker.com/) - A platform for building, shipping, and running applications in containers. Docker containers provide a lightweight, portable, and consistent environment for deploying applications, making it easier to manage dependencies and streamline the deployment process.
- [Swagger](https://swagger.io/) - An open-source framework for designing, building, documenting, and consuming RESTful APIs. It provides tools for generating interactive API documentation, making it easier for developers to understand and test APIs.
- [Jest](https://jestjs.io/) -A delightful JavaScript testing framework with a focus on simplicity and flexibility. It provides a rich set of features for writing and running tests, including built-in support for mocking, assertion, and code coverage analysis. Jest is commonly used for unit and integration testing in JavaScript and TypeScript projects.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [Docker](https://www.docker.com/) (optional, for running with Docker)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```bash
    DB_HOST= localhost
    DB_PORT= 5432
    DB_DATABASE= test
    DB_USERNAME= test
    DB_PASSWORD= test
    REACT_APP_URL=http://localhost:4000
   ```

### Running Server

```bash
npm run start
```

### API Documentation

The API documentation is generated using Swagger. You can access it at http://localhost:3000/docs.

### Development

#### Running tests

To run tests, use:

```bash
npm run test
```

## Docker

To run the application containerized, follow these steps:

1. Navigate to the parent folder of the server where the docker-compose.yml file is located.
2. Open a terminal or command prompt in this directory.
3. Execute the following command:
   ```bash
   docker-copmose up
   ```
