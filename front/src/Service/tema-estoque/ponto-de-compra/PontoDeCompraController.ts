//Axios
import { api } from '@/Service/base/Axios';
//Services
import CClasseFiltro from '@/Service/base/CClasseFiltro';
//Models
import CPontoDeCompraModel from './CPontoDeCompraModel';
//Interfaces
import type { IPontoDeCompraResponse } from '@/interfaces/IPontoDeCompraResponse';
//Constants
import { cBASE_URL_API } from '@/constants/ConstantesRest';

export default class PontoDeCompraController {
  async listarPontoDeCompra(pFiltro: CClasseFiltro<CPontoDeCompraModel>): Promise<IPontoDeCompraResponse> {
    const response = await api.post<IPontoDeCompraResponse>(`${cBASE_URL_API}/pontoDeCompra`, pFiltro);
    return response.data;
  }
}
