import express from "express";
import { authCheck } from "../middlewares/user.middleware.js";
import { getMeController, updateMeController } from "../controllers/user.controller.js";

const userRouter = express.Router();
userRouter.use(authCheck);

userRouter.get('/me', getMeController);

userRouter.put('/me', updateMeController);

export default userRouter;