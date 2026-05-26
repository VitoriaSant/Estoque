//Express
import { Router } from 'express';
//Controllers
import ComprasPendentesController from '../controllers/pedidos-compra-pendente/PedidosCompraPendentesController';
import Teste from '../controllers/teste.controlles';
import PontoDeCompraController from '../controllers/ponto-de-compra/PontoDeCompraController';
import ResumoPedidoCompraPendenteController from '../controllers/pedidos-compra-pendente/resumo/ResumoPedidoCompraPendenteController';

const router = Router();
const comprasPendentesController = new ComprasPendentesController();
const pontoDeCompraController = new PontoDeCompraController();
const teste = new Teste();
const resumoPedidoCompraPendenteController = new ResumoPedidoCompraPendenteController();

router.get('/', teste.get);
router.post('/compraPendente', comprasPendentesController.pedidoCompraPendente);
router.post('/pontoDeCompra', pontoDeCompraController.pontoDeCompra);

//Pedido de compra pendete
router.post('/resumoPedidoCompraPendente', resumoPedidoCompraPendenteController.resumoPedidoCompraPendente);

export default router;
