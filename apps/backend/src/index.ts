import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

import zkpRouter from "./router/zkpRouter";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/zkp", zkpRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
