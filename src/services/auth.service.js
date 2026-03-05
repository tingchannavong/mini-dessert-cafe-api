import {prisma} from "../config/prismaClient.js"

export async function findUserbyEmail(email) {
    const user = await prisma.user.findFirst({
        where: {email: email}
    });
    return user;
}