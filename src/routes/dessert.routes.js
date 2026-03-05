import express from "express";
import { authCheck } from "../middlewares/user.middleware.js";
import { deleteDesertsController, getDessertsController, postDessertsController } from "../controllers/dessert.controller.js";

const dessertRouter = express.Router();

dessertRouter.get('/', getDessertsController);

dessertRouter.post('/', authCheck, postDessertsController);

dessertRouter.delete('/:id', authCheck, deleteDesertsController);

export default dessertRouter;