import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();
const roundsOfHashing = Number(process.env.HASHING_ROUNDS_NUM) || 10;

async function main() {
  const users = ['user', 'admin'];
  // create users
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user, roundsOfHashing);

    await prisma.login.create({
      data: {
        email: `${user}@test.fr`,
        username: user,
        name: user,
        password: hashedPassword,
      },
    });
  }

  const allUsers = await prisma.login.findMany();
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
