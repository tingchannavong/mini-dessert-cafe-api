import createError from 'http-errors'
import { addDessert, deleteDessert, findDessert, getDessert } from '../services/dessert.service.js'

export async function getDessertsController(req, res, next) {
    try {
        const desserts = await getDessert();

        res.status(200).json({ desserts })

    } catch (error) {
        next(error)
    }
}
export async function postDessertsController(req, res, next) {
    try {
        const { role } = req.user
        // and should id exists!! to prevent ghost token
        if (role !== "ADMIN") {
            throw createError(403, "Forbidden: Admin only")
        }
        const { name, price, category } = req.body
        const newDessert = await addDessert(name, price, category);
        res.status(201).json({
            message: "Dessert created",
            dessert: {
                id: newDessert.id,
                name: newDessert.name,
                price: newDessert.price,
                category: newDessert.category
            }
        })

    } catch (error) {
        next(error)
    }
}
export async function deleteDesertsController(req, res, next) {
    try {
        const { role } = req.user
        if (role !== "ADMIN") {
            throw createError(403, "Forbidden: Admin only")
        }
        const id = Number(req.params.id)
        const dessert = await findDessert(id);
        if (!dessert) {
            throw createError(404, "Dessert not found")
        }
        await await deleteDessert(id)
        res.status(200).json({ message: "Dessert deleted" })
    } catch (error) {
        next(error)
    }
}