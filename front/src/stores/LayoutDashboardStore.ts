//Vue
import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Component } from 'vue';

//Services
import CClasseFiltro from '@/Service/base/CClasseFiltro';
import type CPedidoCompraPendenteModel from '@/Service/tema-estoque/pedidos-compra-pendente/CPedidoCompraPendenteModel';

export const useLayoutDashboardStore = defineStore('[LayoutDashboardStore]', () => {
  const exibirFiltro = ref<boolean>(false);

  const classeFiltro = ref<CClasseFiltro<CPedidoCompraPendenteModel>>(new CClasseFiltro<CPedidoCompraPendenteModel>());

  const exibirInformativo = ref<boolean>(false);
  const componenteInformativo = ref<Component | null>(null);

  return {
    exibirFiltro,
    classeFiltro,
    exibirInformativo,
    componenteInformativo,
  };
});
