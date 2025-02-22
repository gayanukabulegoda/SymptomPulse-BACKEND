import express from 'express';
import {notificationController} from '../controllers/notification.controller';
import {authenticate} from '../middleware/auth.middleware';

const router = express.Router();

router.use(authenticate);

router.get('/pending', notificationController.getPending);

export default router;