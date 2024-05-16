import express, { Express } from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import router from "./routes";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/" , router());

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});