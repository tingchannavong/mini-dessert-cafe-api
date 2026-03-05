import {prisma} from "../config/prismaClient.js"

export const getDessert = async () => {
    const desserts = await prisma.dessert.findMany({
        select: {
            id: true,
            name: true,
            price: true,
            category: true
        }
    })
    return desserts

}

export const addDessert = async (name, price, category) => {
    const dessert = await prisma.dessert.create({
        data: {
            name, price, category
        }
    })
    return dessert
}

export const findDessert = async (id) => {
    const dessert = await prisma.dessert.findFirst({
        where: {
            id: id
        }
    })
    return dessert
}

export const deleteDessert = async (id) => {
    await prisma.dessert.delete({
        where: { id: id }
    })
}