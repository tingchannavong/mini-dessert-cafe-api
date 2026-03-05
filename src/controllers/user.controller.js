import createError from "http-errors";
import { editUser, findUserById} from "../services/auth.service.js";

export async function getMeController(re, res, next) {
    try {
        const user = await findUserById(re.user.id);
        res.status(200).json({message: 'user found', user});
    } catch (error) {
        next(error);
    }
}

export async function updateMeController(re, res) {
    try {
        const updateData = re.body;
        const userEdited = await editUser(re.user.id, updateData);
        delete userEdited.password;
        res.status(200).json({message: 'user updated', userEdited});
    } catch (error) {
        next(error);
    }
}