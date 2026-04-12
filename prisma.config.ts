import { defineConfig } from 'prisma/config'

export default defineConfig({
  // datasource.url is only needed for prisma migrate / prisma db pull
  // PrismaClient gets its connection via the driver adapter in lib/prisma.ts
  ...(process.env.DATABASE_URL
    ? { datasource: { url: process.env.DATABASE_URL } }
    : {}),
})
