import { api } from '@/Service/base/Axios';
import CClasseFiltro from '@/Service/base/CClasseFiltro';
import CPontoDeCompraModel from './CPontoDeCompraModel';
import type { IPontoDeCompraResponse } from '@/interfaces/IPontoDeCompraResponse';
import { cBASE_URL_API } from '@/constants/ConstantesRest';

export default class PontoDeCompraController {
  async listarPontoDeCompra(pFiltro: CClasseFiltro<CPontoDeCompraModel>): Promise<IPontoDeCompraResponse> {
    const response = await api.post<IPontoDeCompraResponse>(`${cBASE_URL_API}/pontoDeCompra`, pFiltro);
    return response.data;
  }
}
