import { Foodbank, PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';

export const foodbank = {
    name: 'Manchester foodbank',
    location: 'something',
};

export const user = {
    name: 'test',
    email: 'test@gmail.com',
    password: bcrypt.hashSync('test', 10),
};

const prisma = new PrismaClient();

const run = async () => {
    const user = await createUser();
    const foodbank = await createFoodbank();
    await createNonAuthenticatedUserDonation(foodbank);
    await createAuthenticatedUserDonation(foodbank, user);
};

const createFoodbank = async () => {
    return await prisma.foodbank.create({
        data: {
            name: foodbank.name,
            location: foodbank.location,
        },
    });
};

const createNonAuthenticatedUserDonation = async (foodbank: Foodbank) => {
    return await prisma.donation.create({
        data: {
            amount: 50,
            email: 'not_authenticated@gmail.com',
            total: 50,
            foodbank: {
                connect: {
                    id: foodbank.id,
                },
            },
        },
    });
};

const createAuthenticatedUserDonation = async (foodbank: Foodbank, user: User) => {
    return await prisma.donation.create({
        data: {
            amount: 10,
            email: user.email,
            total: 10,
            user: {
                connect: {
                    id: user.id,
                },
            },
            foodbank: {
                connect: {
                    id: foodbank.id,
                },
            },
        },
    });
};

const createUser = async () => {
    return await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
            name: user.name,
            email: user.email,
            password: user.password,
        },
    });
};

run()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
