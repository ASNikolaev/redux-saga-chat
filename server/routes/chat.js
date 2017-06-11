import express from 'express';

import * as ChatControllers from '../controllers/chat';

const router = express.Router();

router.post('/createChat', ChatControllers.create);
router.get('/', ChatControllers.getChats);
router.get('/:id', ChatControllers.getChat);
export default router;
