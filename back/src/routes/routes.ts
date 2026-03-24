import { Router } from 'express';
import ComprasPendentesController from '../controllers/comprasPendetes.Controlles';

const router = Router();
const comprasPendentesController = new ComprasPendentesController

router.get('/', comprasPendentesController.get);

export default router;