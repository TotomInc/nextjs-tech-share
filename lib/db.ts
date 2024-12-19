// See: https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices
import "server-only";

import { PrismaClient } from "@prisma/client";

// @ts-expect-error -- skip prisma
export const prisma: PrismaClient = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") {
  // @ts-expect-error -- skip prisma
  global.prisma = prisma
}
