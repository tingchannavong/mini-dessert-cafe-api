import express from "express";

const app = express();
const PORT = 5555;

app.listen(PORT, () => {
    `server is running at http://localhost:${PORT}`;
});