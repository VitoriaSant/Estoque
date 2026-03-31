import { Router } from 'express';
import ComprasPendentesController from '../controllers/comprasPendetes.Controlles';
import Teste from '../controllers/teste.controlles';

const router = Router();
const comprasPendentesController = new ComprasPendentesController();
const teste = new Teste();

router.get("/", teste.get);
router.post('/compraPendete', comprasPendentesController.post);

export default router;