import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

app.get('/', (re, res) => {
    res.send('Welcome to mini dessert cafe XD');
})

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
});