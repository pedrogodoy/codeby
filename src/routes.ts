import { Router } from 'express';
import { SendEmailController } from './controllers/SendEmailController';

const router = Router();

const sendEmailController = new SendEmailController();

router.post("/send-email", sendEmailController.create);

export { router };