import { ref } from "vue";
import { defineStore } from "pinia";
import CClasseFiltro from "@/Service/base/CClasseFiltro";
import type CPedidoCompraPendenteModel from "@/Service/tema-estoque/pedidos-compra-pendente/CPedidoCompraPendenteModel";

export const useLayoutDashboardStore = defineStore(
  "[LayoutDashboardStore]",
  () => {
    const exibirFiltro = ref<boolean>(false);
    const classeFiltro = ref<CClasseFiltro<CPedidoCompraPendenteModel>>(
      new CClasseFiltro(),
    );
    const filtrar = ref<(...args: any) => Promise<void>>(
      async (...args: any) => {
        console.log("Filtrando com os seguintes parâmetros:", args);
      },
    );
    return {
      exibirFiltro,
      classeFiltro,
      filtrar,
    };
  },
);