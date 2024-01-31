import express from "express";
import postsController from "../controllers/postsController.js";
import commentsController from "../controllers/commentsController.js";

const router = express.Router();

router.get("/", postsController.getPostList);
router.get("/:postID", postsController.getPostDetail);
router.post("/", postsController.createPost);
router.put("/:postID", postsController.updatePost);
router.delete("/:postID", postsController.deletePost);
router.put("/:postID/like", postsController.updateLike);

router.get("/:postID/comments", commentsController.getCommentList);
router.post("/:postID/comments", commentsController.createComment);
router.delete("/:postID/comments/:commentID", commentsController.deleteComment);
router.put("/:postID/comments/:commentID/like", commentsController.updateLike);

export default router;
