//Vue
import { ref } from 'vue';
import { defineStore } from 'pinia';

//Services
import CClasseFiltro from '@/Service/base/CClasseFiltro';
import type CPedidoCompraPendenteModel from '@/Service/tema-estoque/pedidos-compra-pendente/CPedidoCompraPendenteModel';

export const useLayoutDashboardStore = defineStore('[LayoutDashboardStore]', () => {
  const exibirFiltro = ref<boolean>(false);

  const classeFiltro = ref<CClasseFiltro<CPedidoCompraPendenteModel>>(new CClasseFiltro<CPedidoCompraPendenteModel>());

  return {
    exibirFiltro,
    classeFiltro,
  };
});
