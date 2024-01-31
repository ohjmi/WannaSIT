import express from "express";
import stationsController from "../controllers/stationsController.js";

const router = express.Router();

router.get("/", stationsController.getStations);
router.get("/recent-routes", stationsController.getRecentRoutes);

export default router;
