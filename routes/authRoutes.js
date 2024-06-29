import { Router } from "express";
import { UserController } from "../controllers/index.js";
import { registerValidator, loginValidator }  from "../utils/validations.js";
import { handleValidationErrors, checkAuth } from "../utils/index.js";

const router = Router();

router.post('/register', registerValidator, handleValidationErrors, UserController.register);
router.post('/login', loginValidator, handleValidationErrors, UserController.login);
router.get('/me', checkAuth, UserController.getMe);

export default router;