//Vue
import { ref } from 'vue';
import { defineStore } from 'pinia';
//Services

import ResumoPedidoCompraPendenteController from '@/Service/tema-estoque/pedidos-compra-pendente/resumo-pedido-compra-pendente/ResumoPedidoCompraPendeteController';
import FornecedorPedidoCompraPendenteController from '@/Service/tema-estoque/pedidos-compra-pendente/fornecedores-pedido-compra-pendente/FornecedoresPedidoCompraPendenteController';
import ItensCompraPendenteController from '@/Service/tema-estoque/pedidos-compra-pendente/itens-compra-pendente/ItensCompraPendenteController';
import PedidoCompraPendenteController from '@/Service/tema-estoque/pedidos-compra-pendente/pedido-compra-pendente/PedidoCompraPendenteController';

import CClasseFiltro from '@/Service/base/CClasseFiltro';
//Interfaces
import type { IResumopedidoCompraPendete } from '@/Service/tema-estoque/pedidos-compra-pendente/resumo-pedido-compra-pendente/IResumoPedidoCompraPendete';
import type { IFornecedoresPedidoCompraPendente } from '@/Service/tema-estoque/pedidos-compra-pendente/fornecedores-pedido-compra-pendente/IFornecedoresPedidoCompraPendente';
import type { IItensCompraPendente } from '@/Service/tema-estoque/pedidos-compra-pendente/itens-compra-pendente/IItensCompraPendente';
import type { IPedidoCompraPendente } from '@/Service/tema-estoque/pedidos-compra-pendente/pedido-compra-pendente/IPedidoCompraPendente';

//Models
import type CPedidoCompraPendenteModel from '@/Service/tema-estoque/pedidos-compra-pendente/CPedidoCompraPendenteModel';

export const usePedidoPendenteStore = defineStore('[PedidoPendenteStore]', () => {
  const resumoPedidoCompraPendenteController = new ResumoPedidoCompraPendenteController();
  const filtrarResumoPedidoCompraPendete = ref(
    async (classeFiltro: CClasseFiltro<CPedidoCompraPendenteModel>): Promise<IResumopedidoCompraPendete> =>
      resumoPedidoCompraPendenteController.resumoPedidoCompraPendete(classeFiltro),
  );

  const fornecedorPedidoCompraPendenteController = new FornecedorPedidoCompraPendenteController();
  const filtrarFornecedorPedidoCompraPendente = ref(
    async (classeFiltro: CClasseFiltro<CPedidoCompraPendenteModel>): Promise<IFornecedoresPedidoCompraPendente> =>
      fornecedorPedidoCompraPendenteController.fornecedorPedidoCompraPendete(classeFiltro),
  );

  const itensCompraPendenteController = new ItensCompraPendenteController();
  const filtrarItensCompraPendente = ref(
    async (classeFiltro: CClasseFiltro<CPedidoCompraPendenteModel>): Promise<IItensCompraPendente> =>
      itensCompraPendenteController.itensPedidoCompraPendete(classeFiltro),
  );

  const pedidoCompraPendenteController = new PedidoCompraPendenteController();
  const filtrarPedidoCompraPendente = ref(
    async (classeFiltro: CClasseFiltro<CPedidoCompraPendenteModel>): Promise<IPedidoCompraPendente> =>
      pedidoCompraPendenteController.pedidoCompraPendete(classeFiltro),
  );

  return {
    filtrarResumoPedidoCompraPendete,
    filtrarFornecedorPedidoCompraPendente,
    filtrarItensCompraPendente,
    filtrarPedidoCompraPendente,
  };
});
