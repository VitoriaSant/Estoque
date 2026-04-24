import { ref } from "vue";
import { defineStore } from "pinia";
import CClasseFiltro from "@/Service/base/CClasseFiltro";
import type CPedidoCompraPendenteModel from "@/Service/tema-estoque/pedidos-compra-pendente/CPedidoCompraPendenteModel";
import PedidoCompraPendenteController from "@/Service/tema-estoque/pedidos-compra-pendente/PedidoCompraPendenteController";


export const useLayoutDashboardStore = defineStore(
  "[LayoutDashboardStore]",
  () => {
    const exibirFiltro = ref<boolean>(false);

    const classeFiltro = ref<CClasseFiltro<CPedidoCompraPendenteModel>>(
      new CClasseFiltro(),
    );
  
    const controller = new PedidoCompraPendenteController();
    const filtrarComprasPendentes = ref<(...args: any) => Promise<CPedidoCompraPendenteModel[]>>(
      async (...args: any) => {
        const comprasPendentes = await controller.listarComprasPendentes(
          args[0] || classeFiltro.value,
        );
        console.log("Filtrar", comprasPendentes);
        return comprasPendentes;
      },
    );
  
    return {
      exibirFiltro,
      classeFiltro,
      filtrarComprasPendentes,
    };
  },
);