import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt"

const prisma = new PrismaClient();

async function main() {
    const userSeed = await prisma.user.create({
        data: {
            name: "Admin",
            email: "admin@mail.com",
            role: "ADMIN",
            passport: "1234567890",
            password: hashSync("admin", 10),
        }
    })
    console.log(userSeed)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
