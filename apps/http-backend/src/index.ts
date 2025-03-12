import express, { Application, Request, Response } from 'express';
import cors from "cors";
import { createServer } from "http";
import Routes from "./routes/index.js";
import { HTTP_PORT } from "@repo/backend-common/config";


const app: Application = express();
const PORT = HTTP_PORT;

app.use(express.json());
app.use(cors()); 
app.use('/api',Routes);

const server = createServer(app);

app.get("/", (req: Request, res: Response) => {
    res.send("It's working 🙌");
});
server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));


