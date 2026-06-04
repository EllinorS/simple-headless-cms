import express from 'express';
import { createContact } from '../controllers/contact.controller.js';
import { validate } from '../middlewares/schema.validator.js';
import { contactSchema } from '../middlewares/schemas.js';

const router = express.Router();

router.post('/', validate(contactSchema), createContact);

export default router;