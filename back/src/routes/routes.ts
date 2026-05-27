//Express
import { Router } from 'express';
//Controllers
import Teste from '../controllers/teste.controlles';
import PontoDeCompraController from '../controllers/ponto-de-compra/PontoDeCompraController';
import ResumoPedidoCompraPendenteController from '../controllers/pedidos-compra-pendente/resumo/ResumoPedidoCompraPendenteController';
import PedidoCompraPendenteController from '../controllers/pedidos-compra-pendente/pedidos-pendentes/PedidoCompraPendenteController';
import ItensCompraPendenteController from '../controllers/pedidos-compra-pendente/itens-pendentes/ItensCompraPendenteController';
import FornecedoresPedidoCompraPendenteController from '../controllers/pedidos-compra-pendente/fornecedores-pendentes/FornecedoresPedidoCompraPendenteController';

const router = Router();
const pontoDeCompraController = new PontoDeCompraController();
const teste = new Teste();
const resumoPedidoCompraPendenteController = new ResumoPedidoCompraPendenteController();
const pedidoCompraPendenteController = new PedidoCompraPendenteController();
const itensCompraPendenteController = new ItensCompraPendenteController();
const fornecedoresPedidoCompraPendenteController = new FornecedoresPedidoCompraPendenteController();

router.get('/', teste.get);
router.post('/pontoDeCompra', pontoDeCompraController.pontoDeCompra);

//Pedido de compra pendete
router.post('/resumoPedidoCompraPendente', resumoPedidoCompraPendenteController.ResumoPedidoCompraPendente);
router.post('/pedidoCompraPendente', pedidoCompraPendenteController.PedidoCompraPendente);
router.post('/itensCompraPendente', itensCompraPendenteController.ItensCompraPendente);
router.post(
  '/fornecedoresPedidoCompraPendente',
  fornecedoresPedidoCompraPendenteController.FornecedoresPedidoCompraPendente,
);

export default router;
