import express from "express";
import config from "./src/config/index.js";
import cors from "cors";

import carsRouter from "./src/routes/carsRoutes.js";
import stationsRouter from "./src/routes/stationsRoutes.js";

const app = express();

const port = config.port;

const corsOptions = {
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

app.use("/stations", stationsRouter);
app.use("/cars", carsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
