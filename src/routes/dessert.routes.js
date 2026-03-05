import express from "express";

const dessertRouter = express.Router();

dessertRouter.get('/', registerController);

dessertRouter.post('/', loginController);

dessertRouter.post('/:id', loginController);

export default dessertRouter;