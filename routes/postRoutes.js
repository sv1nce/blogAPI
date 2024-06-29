import { Router } from "express";
import { PostController } from "../controllers/index.js";
import { postCreateValidator } from "../utils/validations.js";
import { handleValidationErrors, checkAuth } from "../utils/index.js";

const router = Router();

router.post('/', checkAuth, postCreateValidator, handleValidationErrors, PostController.createPost);
router.get('/', PostController.getAll);
router.get('/:id', PostController.getOne);
router.put('/:id', checkAuth, PostController.editPost);
router.delete('/:id', checkAuth, PostController.deletePost);

export default router;