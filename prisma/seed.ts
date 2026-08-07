import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env['DATABASE_URL'] ?? '' });
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

async function main() {
  const adminEmail = 'admin@car-marketplace.com';

  const existing = await (prisma).user.findUnique({ where: { email: adminEmail } });
  if (existing) {
    return;
  }
}

main()
  .catch(console.error)
  .finally(() => (prisma).$disconnect());
