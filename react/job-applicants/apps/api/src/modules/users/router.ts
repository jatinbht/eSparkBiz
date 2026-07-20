import { Router } from 'express';
import * as controller from './controller.js';

const router = Router();

router.get('/', controller.list);
router.get('/:id', controller.show);

export { router as usersRouter };
