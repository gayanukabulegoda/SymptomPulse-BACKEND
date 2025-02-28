import {Request, Response} from 'express';
import {symptomService} from '../services/symptom.service';
import logger from "../utils/logger";
/**
 * @description Controller for /symptoms routes
 * @returns {Object} Controller functions
 */
export const symptomController = {
    async logSymptoms(req: Request, res: Response) {
        try {
            const entry = await symptomService.logSymptoms(
                req.user!.id,
                req.body.symptoms
            );

            res.status(201).json({
                success: true,
                data: entry
            });
        } catch (error) {
            logger.error('Symptom logging error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to log symptoms'
            });
        }
    },

    async getHistory(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            const history = await symptomService.getHistory(
                req.user!.id,
                page,
                limit
            );

            res.json({
                success: true,
                data: history
            });
        } catch (error) {
            logger.error('History fetching error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch history'
            });
        }
    }
};