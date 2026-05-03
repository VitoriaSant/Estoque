import { Router } from "express";
import ComprasPendentesController from "../controllers/pedidos-compra-pendente/PedidosCompraPendentesController";
import Teste from "../controllers/teste.controlles";
import PontoDeCompraController from "../controllers/ponto-de-compra/PontoDeCompraController";

const router = Router();
const comprasPendentesController = new ComprasPendentesController();
const pontoDeCompraController = new PontoDeCompraController();
const teste = new Teste();

router.get("/", teste.get);
router.post("/compraPendente", comprasPendentesController.pedidoCompraPendente);
router.get("/pontoDeCompra", pontoDeCompraController.pontoDeCompra);

export default router;