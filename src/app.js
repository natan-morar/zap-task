import express from "express";
import path from 'path';
import usersApiRouter from './api/users.js';

const port = 3333;
const app = express();

app.get("/zaptic", (req, res) => {
    res.sendFile(path.join(path.resolve(), 'src/public/res/zaptic_logo.jpeg'));
});

app.get("/", (req, res) => {
    res.send("Hello from Zaptic! 👋💜");
});

app.use('/api/v1/users', usersApiRouter);

app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(path.resolve(), 'src/404.html'));
});

app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
});


export default app;
