import express from 'express';
import { deleteUser } from '../controllers/delete.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.put('/delete/:userId',verifyToken,deleteUser);

export default router ;