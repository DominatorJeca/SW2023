import {Router} from 'express';
import CashFlowRouter from './Usuarios';
const router  = Router();

router.use('/cashFlow', CashFlowRouter);

export default router;