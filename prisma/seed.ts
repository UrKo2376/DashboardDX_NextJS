// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('M0nde02376', 10);

  // Create Account with ID = 1
  await prisma.account.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      accountTitle: 'Test Account',
      status: 'active',
      license: 'FREE',
      extra1Label: 'Extra 1',
      extra2Label: 'Extra 2',
      extra3Label: 'Extra 3',
    },
  });

  // Create User
  await prisma.user.upsert({
    where: { username: 'UrKo' },
    update: {},
    create: {
      username: 'UrKo',
      password: hashedPassword,
      fullName: 'Steve Tucker',
      accountId: 1,
      level: 1,
      primaryUser: 1,
      rateHour: 0,
      rateDay: 0,
    },
  });

  console.log('✅ Seed complete: User UrKo created');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
