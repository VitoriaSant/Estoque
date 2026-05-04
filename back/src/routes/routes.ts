import { Router } from "express";
import ComprasPendentesController from "../controllers/pedidos-compra-pendente/PedidosCompraPendentesController";
import Teste from "../controllers/teste.controlles";
import PontoDeCompraController from "../controllers/ponto-de-compra/PontoDeCompraController";
import ConsumoDeMaterialController from "../controllers/consumo-de-material/ConsumoDeMaterialController";

const router = Router();
const comprasPendentesController = new ComprasPendentesController();
const pontoDeCompraController = new PontoDeCompraController();
const consumoDeMaterialController = new ConsumoDeMaterialController();
const teste = new Teste();

router.get("/", teste.get);
router.post("/compraPendente", comprasPendentesController.pedidoCompraPendente);
router.post("/pontoDeCompra", pontoDeCompraController.pontoDeCompra);
router.post("/consumoDeMaterial", consumoDeMaterialController.consumoDeMaterial);

export default router;