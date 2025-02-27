import express from 'express';
import {authController} from '../controllers/auth.controller';
import {authenticate, validateRefreshToken} from '../middleware/auth.middleware';
import {validateRequest} from "../middleware/validation.middleware";
import {authValidation} from "../validations/auth.validations";
/**
 * @description Router for /auth routes
 * @returns {Router} Express Router
 */
const router = express.Router();

router.post('/register',
    validateRequest(authValidation.register),
    authController.register
);
router.post('/login',
    validateRequest(authValidation.login),
    authController.login
);
router.post('/refresh', validateRefreshToken, authController.refreshToken);
router.post('/logout', authenticate, authController.logout);

export default router;