import express from "express";
import { authCheck } from "../middlewares/user.middleware.js";
import { getMeController } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get('/me', authCheck, getMeController);

userRouter.put('/me', (re, res) => {
    
});

export default userRouter;