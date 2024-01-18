import express from "express";
import boardsController from "../controllers/boardsController.js"

const router = express.Router();

router.get("/:boardID", boardsController.getPost);
router.post("/", boardsController.createPost);
router.put("/:boardID", boardsController.updatePost);
router.delete("/:boardID", boardsController.deletePost);

export default router;
