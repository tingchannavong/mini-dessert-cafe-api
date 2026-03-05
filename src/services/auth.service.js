import {prisma} from "../config/prismaClient.js"
import bcrypt from "bcrypt";
import createError from "http-errors";
import "dotenv/config";
import { createToken } from "../utils/jwt.js";

export async function findUserbyEmail(email) {
    const user = await prisma.user.findFirst({
        where: {email: email}
    });
    return user;
}

export async function findUserById(id) {
    const userData = await prisma.user.findUnique({
        where: {id}
    });
    return userData;
}

export async function createUser(username, email, password, role) {
    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = await prisma.user.create({
        data: {
            username,
            email,
            role,
            password: hashedPassword
        }
    });
    return newUser;
}

export async function verifyUser(email, password) {
    // check password and user exist
    const userExist = await findUserbyEmail(email);
    const isMatch = await bcrypt.compare(password, userExist.password);
     
     if (!userExist ||!isMatch) {
        throw createError(400, "invalid email or password");
     }

     // create payload
     const payload = {
        id: userExist.id,
        role: userExist.role
     }
     // create token
     const accessToken = createToken(payload, process.env.JWT_SECRET, "1d");
     return {token: accessToken,
        id: userExist.id,
        role: userExist.role,
        username: userExist.username
     };
}

// flexible edit methods where no matter how many fields is sent those will be updated
export async function editUser(id, { email, username, password, role }) {
    const data = {};

    if (email) data.email = email;
    if (username) data.username = username;
    
    if (password) {
        data.password = await bcrypt.hash(password, 5);
    }

    if (role) data.role = role;

    const result = await prisma.user.update({
        where: { id },
        data: data
    });

    return result;
}