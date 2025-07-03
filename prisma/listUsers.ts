import { PrismaClient } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient();

  try {
    const users = await prisma.user.findMany();

    if (users.length === 0) {
      console.log("No users found.");
    } else {
      users.forEach((user) => {
        console.log(`ID: ${user.id}, Username: ${user.username}, Password: ${user.password}, Full Name: ${user.fullName ?? "(none)"}`);
      });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
