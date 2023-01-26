import fs from 'fs'
import path from 'path'
import express from "express";
import { fileURLToPath } from 'url';

const port = 3333;
const app = express();

const CURRENT_DIR = import.meta.url.substring(0, import.meta.url.lastIndexOf("/"))
const STATIC_DIR = path.join(fileURLToPath(CURRENT_DIR), "public/res")

app.get("/", (req, res) => {
    res.send("Hello from Zaptic! 👋💜");
});

app.get("/zaptic", (req, res) => {
    const filename = "zaptic_logo.jpeg"
    const stream = fs.createReadStream(path.join(STATIC_DIR, filename))
    stream.on('open', () => {
        res.set('Content-Type', 'image/jpg');
        stream.pipe(res);
        res.status(200)
    });
});

app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
});

export default app;
