import express from 'express';
import {notificationController} from '../controllers/notification.controller';
import {authenticate} from '../middleware/auth.middleware';
/**
 * @description Router for /notifications routes
 * @returns {Router} Express Router
 */
const router = express.Router();

router.use(authenticate);
router.get('/', notificationController.getNotifications);

export default router;