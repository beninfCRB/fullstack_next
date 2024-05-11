import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient()

async function main() {
    await prisma.user.create({
        data: {
            username: 'Beni',
            email: 'beninf10@gmail.com',
            password: await bcrypt.hash('123', 10)
        }
    })
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