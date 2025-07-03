import { PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient();

  try {
    // Try to find a user by username (replace "UrKo" with your test user)
    const user = await prisma.user.findFirst({
      where: { username: "UrKo" },
    });

    if (user) {
      console.log("User found:", user);
    } else {
      console.log("User not found");
    }
  } catch (error) {
    console.error("Error querying user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
