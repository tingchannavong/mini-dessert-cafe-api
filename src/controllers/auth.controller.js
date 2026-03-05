import createError from "http-errors";
import { findUserbyEmail, createUser, verifyUser} from "../services/auth.service.js";

export async function registerController(re, res, next) {
    const {username, email, password, role} = re.body;
 
    try {
     const userExist = await findUserbyEmail(email); 
     
     if (userExist) {
        throw createError(400, "email already exists");
     }

     const newUserData = await createUser(username, email, password, role);
     delete newUserData.password;

     res.status(201).json({message: "register success", newUserData});
    } catch (error) {
        next(error);
    }
}

export async function loginController(re, res, next) {
    // validate if not email found, throw readable human error
    const {email, password} = re.body;
 
    try {
        const user = await verifyUser(email, password);

        res.status(200).json({message: "login success", user});
    } catch (error) {
        next(error);
    }
}

