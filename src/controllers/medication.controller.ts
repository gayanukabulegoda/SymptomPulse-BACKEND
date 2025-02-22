import {Request, Response} from 'express';
import {medicationService} from '../services/medication.service';
import logger from "../utils/logger";

export const medicationController = {
    async addMedication(req: Request, res: Response) {
        try {
            const medication = await medicationService.addMedication(
                req.user!.id,
                req.body.name,
                req.body.schedule,
                new Date(req.body.startDate),
                req.body.dosage,
                req.body.endDate ? new Date(req.body.endDate) : undefined
            );

            res.status(201).json({
                success: true,
                data: medication
            });
        } catch (error) {
            logger.error('Medication error:', error);
            res.status(400).json({
                success: false,
                error: 'Failed to add medication'
            });
        }
    },

    async getMedications(req: Request, res: Response) {
        try {
            const medications = await medicationService.getMedications(req.user!.id);

            res.json({
                success: true,
                data: medications
            });
        } catch (error) {
            logger.error('Medication fetching error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch medications'
            });
        }
    }
};