import fs from 'fs'
import path from 'path'
import express from "express";
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";

import usersRouter from './api/users-router.js'

const port = 3333;
const app = express();
app.use(bodyParser.json());

const CURRENT_DIR = import.meta.url.substring(0, import.meta.url.lastIndexOf("/"))
const STATIC_DIR = path.join(fileURLToPath(CURRENT_DIR), "public/res")
export const DATA_DIR = path.join(fileURLToPath(CURRENT_DIR), "data")

app.use("/api/v1/users", usersRouter)

export const errorHandlingMiddleware = (req, res, next) => {
    const routes = new Set(app._router.stack.filter(r => r.route).map(r => r.route.path))
  
    if (!routes.has(req.url)) {
        res.send("Seems like you're lost😱. Do you need some help?🕵️")
    }
  
    next()
  }

app.use(errorHandlingMiddleware)

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
