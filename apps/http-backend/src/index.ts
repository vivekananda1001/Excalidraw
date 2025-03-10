import express, { Application } from "express";
import "dotenv/config";
import cors from "cors";


const app: Application = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(cors());



app.listen(PORT);


