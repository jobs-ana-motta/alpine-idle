# Alpine Idle Startup

This repository contains the basic startup for the **Alpine Idle** project.
It includes a Fastify backend and a Next.js frontend, both written in TypeScript.

## Development

Install dependencies in each package with Node.js 22 or later and run the development servers:

```bash
npm install --workspaces
npm run dev:backend # starts backend on port 3001 using tsx
npm run dev:frontend # starts frontend on port 3000
```

The frontend is accessible at `http://localhost:3000` and the backend at
`http://localhost:3001/ping`.

## Database Setup

The backend uses [Prisma](https://www.prisma.io/) with SQLite for development.
Generate the Prisma client and create the local database:

```bash
npx prisma generate --schema backend/prisma/schema.prisma
npx prisma migrate dev --schema backend/prisma/schema.prisma --name init
```

The SQLite database is stored at `backend/dev.db` by default. The connection
string can be changed in `backend/.env`.
## Example API usage

Here are some example `curl` commands for interacting with the new CRUD routes:

```bash
# Users
curl http://localhost:3001/users
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com"}'
curl -X PUT http://localhost:3001/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Updated"}'
curl -X DELETE http://localhost:3001/users/1

# Items
curl http://localhost:3001/items
curl -X POST http://localhost:3001/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Sword","description":"Basic sword"}'
```
