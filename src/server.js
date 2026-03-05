import express from "express";
import "dotenv/config";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (re, res) => {
    res.send('Welcome to mini dessert cafe XD');
});

app.use('/auth', authRouter);

app.use('/users', userRouter);

app.use('/desserts', (re, res) => {
    res.send('desserts service');

});

app.use('/reviews', (re, res) => {
    res.send('reviews service');
});

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
});