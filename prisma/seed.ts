import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Seed essential data to the database before running the app.
 *
 * @see https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding
 */
async function seed() {
  await prisma.pricingPlan.createMany({
    data: [
      {
        popular: true,
        name: "Starter Plan",
        description: "Start managing your invoices like a pro, perfect for freelancers.",
        price: 7.89,
        maxInvoices: 50,
        maxUsers: 2,
        maxCustomers: 10,
      },
      {
        popular: false,
        name: "Team Plan",
        description: "More quotas and features, perfect for medium-large teams.",
        price: 24.89,
        maxInvoices: 500,
        maxUsers: 20,
        maxCustomers: 100,
      },
    ],
  });
}

seed();
