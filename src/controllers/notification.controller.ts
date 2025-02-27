import {Request, Response} from 'express';
import {notificationService} from '../services/notification.service';
import logger from "../utils/logger";
/**
 * @description Controller for /notifications routes
 * @returns {Object} Controller functions
 */
export const notificationController = {
    async getNotifications(req: Request, res: Response) {
        try {
            const notifications = await notificationService.getNotifications(req.user!.id);
            res.json({data: notifications});
        } catch (error) {
            logger.error('Failed to fetch pending notifications:', error);
            res.status(500).json({error: 'Failed to fetch notifications'});
        }
    }
};