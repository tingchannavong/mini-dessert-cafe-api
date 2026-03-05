import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

app.get('/', (re, res) => {
    res.send('Welcome to mini dessert cafe XD');
});

app.use('/auth', (re, res) => {
    res.send('auth service');
});

app.use('/users', (re, res) => {
    res.send('users service');
});
app.use('/desserts', (re, res) => {
    res.send('desserts service');

});

app.use('/reviews', (re, res) => {
    res.send('reviews service');
});

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
});