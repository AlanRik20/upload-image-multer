import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'node:path'
import { router } from './routes/product.routes.js';


const app = express()

app.use(express.json())
app.use(cors({origin:["http://localhost:3000","http://localhost:5173"], credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]}))
app.use(morgan("dev"));

app.use("/products",router);
app.use('/uploads/', express.static(path.resolve('src/uploads')));



const PORT = 3000

app.listen(PORT)

console.log(`server running on port ${PORT}`);