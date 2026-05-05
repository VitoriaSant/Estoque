import { ref } from "vue";
import { defineStore } from "pinia";
import CClasseFiltro from "@/Service/base/CClasseFiltro";
import type CPedidoCompraPendenteModel from "@/Service/tema-estoque/pedidos-compra-pendente/CPedidoCompraPendenteModel";
import PedidoCompraPendenteController from "@/Service/tema-estoque/pedidos-compra-pendente/PedidoCompraPendenteController";
import PontoDeCompraController from "@/Service/tema-estoque/ponto-de-compra/PontoDeCompraController";
import type { IPedidoCompraPendenteResponse } from "@/interfaces/IPedidoCompraPendenteResonse";
import type { IPontoDeCompraResponse } from "@/interfaces/IPontoDeCompraResponse";

export const useLayoutDashboardStore = defineStore(
  "[LayoutDashboardStore]",
  () => {
    const exibirFiltro = ref<boolean>(false);

    const classeFiltro = ref<CClasseFiltro<CPedidoCompraPendenteModel>>(
      new CClasseFiltro(),
    );
  
    const controller = new PedidoCompraPendenteController();
    const filtrarComprasPendentes = ref<(...args: any) => Promise<IPedidoCompraPendenteResponse>>(
      async (...args: any) => {
        const comprasPendentes = await controller.listarComprasPendentes(
          args[0] || classeFiltro.value,
        );
        return comprasPendentes;
      },
    );

    const pontoDeCompraController = new PontoDeCompraController();
    const filtrarPontoDeCompra = ref<(...args: any) => Promise<IPontoDeCompraResponse>>(
      async (...args: any) => {
        const pontoDeCompra = await pontoDeCompraController.listarPontoDeCompra(
          args[0] || classeFiltro.value,
        );
        return pontoDeCompra;
      },
    );
  
    return {
      exibirFiltro,
      classeFiltro,
      filtrarComprasPendentes,
      filtrarPontoDeCompra,
    };
  },
);