//Vue
import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Component } from 'vue';

//Services
import CClasseFiltro from '@/service/base/CClasseFiltro';
import type CPedidoCompraPendenteGeralModel from '@/service/tema-estoque/pedidos-compra-pendente/CPedidoCompraPendenteGeralModel';

export const useLayoutDashboardStore = defineStore('[LayoutDashboardStore]', () => {
  const exibirFiltro = ref<boolean>(false);

  const classeFiltro = ref<CClasseFiltro<CPedidoCompraPendenteGeralModel>>(
    new CClasseFiltro<CPedidoCompraPendenteGeralModel>(),
  );

  const exibirInformativo = ref<boolean>(false);
  const componenteInformativo = ref<Component | null>(null);

  return {
    exibirFiltro,
    classeFiltro,
    exibirInformativo,
    componenteInformativo,
  };
});
