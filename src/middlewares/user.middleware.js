import createError from "http-errors";
import { verifyToken } from "../utils/jwt.js";

export async function authCheck(re, res, next) {
    const token = re.headers?.authorization.split(' ')[1];
 
    if (!token) {
        throw createError(401, 'Unauthorized');
    }
    // check token
    try {
        const payload = verifyToken(token, process.env.JWT_SECRET);
        // add data before going onto next
        re.user = payload;
        next();
    } catch (error) {
        next(error);
    }
}
// this might not protect against ghost token
// redis will??