import express from "express";
import cors from "cors";
import expressWs from "express-ws";
import session from "express-session";

import config from "./src/config/index.js";

import carsRouter from "./src/routes/carsRoutes.js";
import stationsRouter from "./src/routes/stationsRoutes.js";

import setupWebSocket from "./webSocket.js";
import path from "path";
const scriptDirectory = path.resolve();
const filePath = path.join(scriptDirectory, "public", "client3.html");

const app = express();
expressWs(app);

const port = config.port;

app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);

const corsOptions = {
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

app.use("/stations", stationsRouter);
app.use("/cars", carsRouter);

// ========== 웹 소켓 테스트
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(filePath);
});
// ==========

const wsClients = new Map();

setupWebSocket(app, wsClients);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
