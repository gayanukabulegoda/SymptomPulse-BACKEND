import express from 'express';
import {medicationController} from '../controllers/medication.controller';
import {authenticate} from '../middleware/auth.middleware';
import {validateRequest} from "../middleware/validation.middleware";
import {medicationValidation} from "../validations/medication.validations";
/**
 * @description Router for /medications routes
 * @returns {Router} Express Router
 */
const router = express.Router();

router.use(authenticate);
router.post('/',
    validateRequest(medicationValidation.createEntry),
    medicationController.addMedication
);
router.get('/', medicationController.getMedications);

export default router;