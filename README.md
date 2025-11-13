# Storage App -> Backend Module

This module content the logic for a management files from a bucket cloud storage where the files will save in a folder for client in general cloud bucket. The system poses a architecture mvc whit a management isolated multi tenancy where each tenant has your own database and storage folder, also the files can expose from protected API, to render in website by client

The access a this App use identify roles, encrypting for data and credential to access

This module use a tech stack with:

- NodeJs
- PrismaORM
- Express
- Yarn 
- JWT

## Download and run project

```bash
    git clone https://github.com/Ricardo-Vega01/tenant_Storage.git
```

## Configure environment variables

```bash
    mv .env.example .env
```
Enter to .env and edit DATABASE_URL

## Execute migrations

```bash
    yarn prisma:dev --name init
    yarn prisma:generate
```

## Run app

```bash
    yarn dev
```