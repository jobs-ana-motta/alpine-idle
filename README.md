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
