# maintenance-tasks

|    Language     |    Framework     |
|:---------------:|:----------------:|
|   Typescript    |     NestJS       |

A micro-service responsible for maintenance tasks.<br>

## Project Context & Decisions

### App Organization
The project is organized in 5 domains: **authorization**, **health**, **notifications**, **tasks** and **service-authentication**.

The first 4 domains are separated as different pieces of this micro-service according to their responsibility.

The **service-authentication** is a simulation (a mock) of an external micro-service just to help us use this one. This module pretends to represent
a micro-service that is responsible to authenticate users and provide them a JWT when their username and password are correct. <br>
That's why you'll only find a basic controller with 2 mocked users: a manager and a technician. <br>
For testing purposes you can use the ones bellow. If you want, you can also add more to the list inside _authentication.controller.ts_.

```text
Manager:
    username: ironman
    password: ironManIsManager
    
Technician:
    username: spiderman
    password: spiderManIsTechnician
```

### k8s Organization
An important note is that I'm considering this to be a service that is not visible to the public. So I'm not creating Ingress files to ensure its public visibility.
I'm considering that the HTTP requests made to this service are being done through another one in an API public layer.

In the **deployment.yaml** file you will see "fictional.registry.example:10443" which represents a fictional image registry. This could be Azure for example.

In the **environment.yaml** file we're creating the service-maintenance-tasks config map but also ensuring that the service's container is able to access both service-maintenance-tasks and databases secrets. In here I'm considering that they either are manually maintained or set elsewhere for security reasons.

Plus, I agree that the databases should be not maintained by a single service when it might be shared.

## Installation

```bash
# Use correct Node version
nvm use

# Install dependencies
yarn install
```

## Run the app
```bash
# Run app and necessary dependencies at once
docker compose up

# Run the containerized database.
docker compose up mysql

# Run the containerized broker
docker compose up rabbitmq

# Run the containerized app.
docker compose up app
```

Run the app locally.
```bash
# watch mode
yarn start:dev

# production mode
yarn start:prod
```

## Test

If you want to give it a shot yourself check the `maintenance-tasks.postman_collection.json` in the project root.
```bash
# unit tests
yarn test

# test coverage
yarn run test:cov
```

## Formatting/Quality

```bash
# format + quality checks
yarn lint

# format + quality checks with auto fix
yarn lint:fix
```
