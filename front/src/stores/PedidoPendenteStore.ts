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
import type { IFornecedoresPedidoCompraPendente } from '@/service/tema-estoque/pedidos-compra-pendente/fornecedores-pedido-compra-pendente/IFornecedoresPedidoCompraPendente';
import type { IItensCompraPendente } from '@/service/tema-estoque/pedidos-compra-pendente/itens-compra-pendente/IItensCompraPendente';

//Classes
import type CPedidoCompraPendenteGeralModel from '@/service/tema-estoque/pedidos-compra-pendente/CPedidoCompraPendenteGeralModel';
import type CPedidoCompraPendente from '@/service/tema-estoque/pedidos-compra-pendente/pedido-compra-pendente/CPedidoCompraPendenteModel';
import CResponseConsultaPaginada from '@/service/base/CResponseConsultaPaginada';
import CClasseFiltro from '@/service/base/CClasseFiltro';

export const usePedidoPendenteStore = defineStore('[PedidoPendenteStore]', () => {
  const resumoPedidoCompraPendenteController = new ResumoPedidoCompraPendenteController();
  const filtrarResumoPedidoCompraPendete = ref(
    async (classeFiltro: CClasseFiltro<CPedidoCompraPendenteGeralModel>): Promise<IResumopedidoCompraPendete> => {
      return resumoPedidoCompraPendenteController.resumoPedidoCompraPendete(classeFiltro);
    },
  );

  const fornecedorPedidoCompraPendenteController = new FornecedorPedidoCompraPendenteController();
  const filtrarFornecedorPedidoCompraPendente = ref(
    async (classeFiltro: CClasseFiltro<CPedidoCompraPendenteGeralModel>): Promise<IFornecedoresPedidoCompraPendente> =>
      fornecedorPedidoCompraPendenteController.fornecedorPedidoCompraPendete(classeFiltro),
  );

  const itensCompraPendenteController = new ItensCompraPendenteController();
  const filtrarItensCompraPendente = ref(
    async (classeFiltro: CClasseFiltro<CPedidoCompraPendenteGeralModel>): Promise<IItensCompraPendente> =>
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
