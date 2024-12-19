## Getting Started

1. Create a free PostgreSQL database at [neon.tech](https://console.neon.tech/)
2. Grab the PostgreSQL connection string and fill the `DATABASE_URL` environment variable in the `.env` file (`cp .env.example .env`)
3. Also fill `SESSION_NAME` and `SESSION_SECRET` environment variables (used to manage session cookie with [iron-session](https://github.com/vvo/iron-session))
4. `npm i` — ensure you are running at least **Node v20**
5. `npx prisma db push` — push the Prisma schema to the remote neon.tech database
6. `npm run seed` — to make the demo easy, we seed inside the production DB (neon.tech allow database branching for multiple environments)
7. `npm run dev` — this starts the local Next.js development server with [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)
8. Visit `localhost:3000`
  - Register at `/auth/signup`
  - Login at `/auth/login`
  - Access dashboard at `/dashboard`
