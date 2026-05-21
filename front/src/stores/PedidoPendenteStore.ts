//Vue
import { ref } from 'vue';
import { defineStore } from 'pinia';
//Services
import PedidoCompraPendenteController from '@/Service/tema-estoque/pedidos-compra-pendente/PedidoCompraPendenteController';
import CClasseFiltro from '@/Service/base/CClasseFiltro';
//Interfaces
import type { IPedidoCompraPendenteResponse } from '@/interfaces/IPedidoCompraPendenteResonse';
//Models
import type CPedidoCompraPendenteModel from '@/Service/tema-estoque/pedidos-compra-pendente/CPedidoCompraPendenteModel';

export const usePedidoPendenteStore = defineStore('[PedidoPendenteStore]', () => {
  const controller = new PedidoCompraPendenteController();
  const filtrarComprasPendentes = ref(
    async (classeFiltro: CClasseFiltro<CPedidoCompraPendenteModel>): Promise<IPedidoCompraPendenteResponse> =>
      controller.listarComprasPendentes(classeFiltro),
  );

  return {
    filtrarComprasPendentes,
  };
});
