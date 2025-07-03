import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const username = "UrKo";
  const password = "M0nde0237^";
  const fullName = "Steve Tucker";

  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if user already exists
  const existingUser = await prisma.user.findFirst({
    where: { username },
  });

  if (existingUser) {
    console.log(`User ${username} already exists.`);
    // Optionally update user details here
  } else {
    // Create account and user in one go with nested create
    const account = await prisma.account.create({
      data: {
        id: 1,
        accountTitle: "Default Account",
        status: "active",
        license: "LICENSE-001",
        users: {
          create: {
            username,
            password: hashedPassword,
            fullName,
            level: 1,
            // add other user fields as needed
          },
        },
      },
      include: {
        users: true, // Include created users in response if you want to log them
      },
    });

    console.log("Created account and user:", account);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
