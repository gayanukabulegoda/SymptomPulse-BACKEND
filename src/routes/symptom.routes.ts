import express from 'express';
import {symptomController} from '../controllers/symptom.controller';
import {authenticate} from '../middleware/auth.middleware';
import {validateRequest} from "../middleware/validation.middleware";
import {symptomValidation} from "../validations/symptom.validations";
/**
 * @description Router for /symptoms routes
 * @returns {Router} Express Router
 */
const router = express.Router();

router.use(authenticate);
router.post('/',
    validateRequest(symptomValidation.createEntry),
    symptomController.logSymptoms
);
router.get('/',
    validateRequest(symptomValidation.getHistory),
    symptomController.getHistory
);

export default router;