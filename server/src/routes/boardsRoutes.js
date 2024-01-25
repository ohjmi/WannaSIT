import express from "express";
import boardsController from "../controllers/boardsController.js"

const router = express.Router();

router.get("/", boardsController.getPostList)
router.get("/:boardID", boardsController.getPostDetail);
router.post("/", boardsController.createPost);
router.put("/:boardID", boardsController.updatePost);
router.delete("/:boardID", boardsController.deletePost);
router.put("/like/:boardID", boardsController.updateLike);

export default router;
