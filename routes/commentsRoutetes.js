import { Router } from "express";
import { checkAuth } from "../utils/index.js";
import { CommentController } from "../controllers/index.js";

const router = Router();

router.post('/:id', checkAuth, CommentController.createComment);
router.get('/:id', CommentController.getComment);
router.post('/:id/like', checkAuth, CommentController.likeComment);

export default router;