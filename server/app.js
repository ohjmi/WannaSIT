import express from "express";
import cors from "cors";
import expressWs from "express-ws";
import session from "express-session";
import config from "./src/config/index.js";

import carsRouter from "./src/routes/carsRoutes.js";
import stationsRouter from "./src/routes/stationsRoutes.js";

import setupWebSocket from "./webSocket.js";

const app = express();
expressWs(app);

const port = config.port;

app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000,
    },
  })
);

const corsOptions = {
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

app.use("/stations", stationsRouter);
app.use("/cars", carsRouter);

const wsClients = new Map();

setupWebSocket(app, wsClients);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
