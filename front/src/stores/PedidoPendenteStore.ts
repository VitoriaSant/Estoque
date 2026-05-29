//Vue
import { ref } from 'vue';
import { defineStore } from 'pinia';

//Controlles
import ResumoPedidoCompraPendenteController from '@/service/tema-estoque/pedidos-compra-pendente/resumo-pedido-compra-pendente/ResumoPedidoCompraPendeteController';
import FornecedorPedidoCompraPendenteController from '@/service/tema-estoque/pedidos-compra-pendente/fornecedores-pedido-compra-pendente/FornecedoresPedidoCompraPendenteController';
import ItensCompraPendenteController from '@/service/tema-estoque/pedidos-compra-pendente/itens-compra-pendente/ItensCompraPendenteController';
import PedidoCompraPendenteController from '@/service/tema-estoque/pedidos-compra-pendente/pedido-compra-pendente/PedidoCompraPendenteController';

//Interfaces
import type { IResumopedidoCompraPendete } from '@/service/tema-estoque/pedidos-compra-pendente/resumo-pedido-compra-pendente/IResumoPedidoCompraPendete';

//Classes
import type CPedidoCompraPendenteGeralModel from '@/service/tema-estoque/pedidos-compra-pendente/CPedidoCompraPendenteGeralModel';
import type CPedidoCompraPendente from '@/service/tema-estoque/pedidos-compra-pendente/pedido-compra-pendente/CPedidoCompraPendenteModel';
import type CItensCompraPendente from '@/service/tema-estoque/pedidos-compra-pendente/itens-compra-pendente/CItensCompraPendenteModel';
import type CResumoPedidoCompraPendente from '@/service/tema-estoque/pedidos-compra-pendente/resumo-pedido-compra-pendente/CResumoPedidoCompraPendenteModel';
import CResponseConsultaPaginada from '@/service/base/CResponseConsultaPaginada';
import CResponseConsulta from '@/service/base/CResponseConsulta';
import CClasseFiltro from '@/service/base/CClasseFiltro';
import type CFornecedoresPedidoCompraPendente from '@/service/tema-estoque/pedidos-compra-pendente/fornecedores-pedido-compra-pendente/CFornecedoresPedidoCompraPendenteModel';

export const usePedidoPendenteStore = defineStore('[PedidoPendenteStore]', () => {
  const resumoPedidoCompraPendenteController = new ResumoPedidoCompraPendenteController();
  const filtrarResumoPedidoCompraPendete = ref(
    async (classeFiltro: CClasseFiltro<CPedidoCompraPendenteGeralModel>): Promise<CResponseConsulta<CResumoPedidoCompraPendente>> =>
      resumoPedidoCompraPendenteController.resumoPedidoCompraPendete(classeFiltro),
  );

  const fornecedorPedidoCompraPendenteController = new FornecedorPedidoCompraPendenteController();
  const filtrarFornecedorPedidoCompraPendente = ref(
    async (
      classeFiltro: CClasseFiltro<CPedidoCompraPendenteGeralModel>,
    ): Promise<CResponseConsultaPaginada<CFornecedoresPedidoCompraPendente>> =>
      fornecedorPedidoCompraPendenteController.fornecedorPedidoCompraPendete(classeFiltro),
  );

  const itensCompraPendenteController = new ItensCompraPendenteController();
  const filtrarItensCompraPendente = ref(
    async (
      classeFiltro: CClasseFiltro<CPedidoCompraPendenteGeralModel>,
    ): Promise<CResponseConsultaPaginada<CItensCompraPendente>> =>
      itensCompraPendenteController.itensPedidoCompraPendete(classeFiltro),
  );

  const pedidoCompraPendenteController = new PedidoCompraPendenteController();
  const filtrarPedidoCompraPendente = ref(
    async (
      classeFiltro: CClasseFiltro<CPedidoCompraPendenteGeralModel>,
    ): Promise<CResponseConsultaPaginada<CPedidoCompraPendente>> =>
      pedidoCompraPendenteController.pedidoCompraPendete(classeFiltro),
  );

  return {
    filtrarResumoPedidoCompraPendete,
    filtrarFornecedorPedidoCompraPendente,
    filtrarItensCompraPendente,
    filtrarPedidoCompraPendente,
  };
});
