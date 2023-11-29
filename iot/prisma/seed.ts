// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const users = ['user', 'admin'];
  // create users
  for (const user of users) {
    const profile = await prisma.profile.create({
      data: { name: user },
    });

    await prisma.login.create({
      data: {
        email: `${user}@test.fr`,
        username: user,
        password: user,
        profileId: profile.id,
      },
    });
  }

  const allUsers = await prisma.login.findMany({
    include: {
      profile: true,
    },
  });
  console.dir(allUsers, { depth: null });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
