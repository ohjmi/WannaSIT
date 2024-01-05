import express from "express";
import carsController from "../controllers/carsController.js";

const router = express.Router();

router.get("/", carsController.rank);
router.get("/info", carsController.info);

export default router;
