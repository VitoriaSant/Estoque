//Axios
import { api } from '@/Service/base/Axios';
//Services
import CClasseFiltro from '@/Service/base/CClasseFiltro';
//Models
import CPontoDeCompraModel from './CPontoDeCompraModel';
//Interfaces
import type { IPontoDeCompraResponse } from '@/Service/tema-estoque/ponto-de-compra/IPontoDeCompraResponse';
//Constants
import { cBASE_URL_API } from '@/constants/ConstantesRest';

export default class PontoDeCompraController {
  private readonly endpoint = {
    listar: '/pontoDeCompra',
  };
  async listarPontoDeCompra(pFiltro: CClasseFiltro<CPontoDeCompraModel>): Promise<IPontoDeCompraResponse> {
    const response = await api.post<IPontoDeCompraResponse>(`${cBASE_URL_API}${this.endpoint.listar}`, pFiltro);
    return response.data;
  }
}
