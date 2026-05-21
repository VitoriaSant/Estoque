//Vue
import { ref } from 'vue';
import { defineStore } from 'pinia';

//Services
import PontoDeCompraController from '@/Service/tema-estoque/ponto-de-compra/PontoDeCompraController';
import CClasseFiltro from '@/Service/base/CClasseFiltro';
import CPontoDeCompraModel from '@/Service/tema-estoque/ponto-de-compra/CPontoDeCompraModel';

//Interfaces
import type { IPontoDeCompraResponse } from '@/interfaces/IPontoDeCompraResponse';

export const usePontoDeCompraStore = defineStore('[PontoDeCompraStore]', () => {
  const pontoDeCompraController = new PontoDeCompraController();
  const filtrarPontoDeCompra = ref(
    async (classeFiltro: CClasseFiltro<CPontoDeCompraModel>): Promise<IPontoDeCompraResponse> =>
      pontoDeCompraController.listarPontoDeCompra(classeFiltro),
  );

  return {
    filtrarPontoDeCompra,
  };
});
