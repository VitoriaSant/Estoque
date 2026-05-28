//Vue
import { ref } from 'vue';
import { defineStore } from 'pinia';

//Services
import PontoDeCompraController from '@/service/tema-estoque/ponto-de-compra/PontoDeCompraController';
import CClasseFiltro from '@/service/base/CClasseFiltro';
import CPontoDeCompraModel from '@/service/tema-estoque/ponto-de-compra/CPontoDeCompraModel';

//Interfaces
import type { IPontoDeCompraResponse } from '@/service/tema-estoque/ponto-de-compra/IPontoDeCompraResponse';

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

