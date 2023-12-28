import express from "express";
import stationsController from "../controllers/stationsController.js";

const router = express.Router();

router.get("/", stationsController.getStations);

export default router;
