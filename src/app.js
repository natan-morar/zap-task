import express from "express";
import path from 'path';
const port = 3333;
const app = express();

app.get("/", (req, res) => {
    res.send("Hello from Zaptic! 👋💜");
});

app.get("/zaptic", (req, res) => {
    res.sendFile(path.join(path.resolve(), 'src/public/res/zaptic_logo.jpeg'));
});

app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
});

app.use((req, res, next) => {
    res.status(404).send("Seems like you're lost😱. Do you need some help?🕵️")
});

export default app;
