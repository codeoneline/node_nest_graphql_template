# Nest Graphql Template

### Stack
- Database - PostgreSQL
- GraphQL API - NestJS

# Getting Started

### Create Env File
copy the sample.env file to root directory and call name it .env
This file holds the environment configuration for your app and will automatically be picked up by the package dotenv.

Local .env
```
PORT=3000
SECRET=PleaseChange
DATABASE_HOST=localhost
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=template
```

remote DEV .env
```
PORT=3000
SECRET=elleon
DATABASE_HOST=35.232.136.117
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=dev
```
# Database setup
#### Local Database

#### Remote Database

#### Migrations

Create migration
```
npm run migrate:create CreateTableUser
```
Run migrations
```
npm run migrate:up
```
Revert most recent migration
```
npm run migrate:down
```