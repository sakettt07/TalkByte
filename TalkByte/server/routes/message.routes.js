import express from 'express';
import { getAllUsers, getMessages, sendMessage } from '../controllers/message.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router=express.Router();

router.route('/users').get(isAuthenticated,getAllUsers);
router.route('/:id').get(isAuthenticated,getMessages);
router.route('/send-message/:id').post(isAuthenticated,sendMessage);