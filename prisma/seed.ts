import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcryptjs';

const adapter = new PrismaPg({ connectionString: process.env['DATABASE_URL'] ?? '' });
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

async function main() {
  const adminEmail = 'admin@car-marketplace.com';
  const adminPassword = 'Admin@1234';

  const existing = await (prisma as any).user.findUnique({ where: { email: adminEmail } });
  if (existing) {
    console.log(`Admin already exists: ${adminEmail}`);
    console.log('Login with:  email:', adminEmail, ' / password:', adminPassword);
    return;
  }

  const hashed = await bcrypt.hash(adminPassword, 10);
  const admin = await (prisma as any).user.create({
    data: {
      email: adminEmail,
      name: 'Admin',
      password: hashed,
      role: 'admin',
    },
  });

  console.log('✅ Admin user created!');
  console.log('  ID:       ', admin.id);
  console.log('  Email:    ', adminEmail);
  console.log('  Password: ', adminPassword);
  console.log('');
  console.log('POST /api/auth/login with:');
  console.log(JSON.stringify({ email: adminEmail, password: adminPassword }, null, 2));
}

main()
  .catch(console.error)
  .finally(() => (prisma as any).$disconnect());
