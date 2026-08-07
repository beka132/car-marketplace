import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

function createPrismaClient() {
  const connectionString = process.env['DATABASE_URL'] ?? '';
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);
}

type PrismaClientInstance = ReturnType<typeof createPrismaClient>;

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly client: PrismaClientInstance = createPrismaClient();

  get user() { return this.client.user; }
  get carListing() { return this.client.carListing; }
  get carInquiry() { return this.client.carInquiry; }
  get message() { return this.client.message; }

  async onModuleInit() {
    await (this.client as unknown as { $connect(): Promise<void> }).$connect();
  }

  async onModuleDestroy() {
    await (this.client as unknown as { $disconnect(): Promise<void> }).$disconnect();
  }
}
