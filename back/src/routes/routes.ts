import { Router } from "express";
import ComprasPendentesController from "../controllers/pedidos-compra-pendente/PedidosCompraPendentesController";
import Teste from "../controllers/teste.controlles";

const router = Router();
const comprasPendentesController = new ComprasPendentesController();
const teste = new Teste();

router.get("/", teste.get);
router.post("/compraPendente", comprasPendentesController.post);

export default router;
