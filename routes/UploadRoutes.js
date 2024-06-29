import { Router } from "express";
import { upload, uploadFile } from '../controllers/UploadController.js';
import {checkAuth} from "../utils/index.js";

const router = Router();

router.post('/', checkAuth, upload.single('file'), uploadFile);

export default router;