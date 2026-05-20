//Axios
import { api } from '@/Service/base/Axios';
//Services
import type CClasseFiltro from '@/Service/base/CClasseFiltro';
//Models
import CPedidoCompraPendenteModel from './CPedidoCompraPendenteModel';
//Interfaces
import type { IPedidoCompraPendenteResponse } from '@/interfaces/IPedidoCompraPendenteResonse';
//Constants
import { cBASE_URL_API } from '@/constants/ConstantesRest';

export default class PedidoCompraPendenteController {
  async listarComprasPendentes(
    pFiltros: CClasseFiltro<CPedidoCompraPendenteModel>,
  ): Promise<IPedidoCompraPendenteResponse> {
    const response = await api.post<IPedidoCompraPendenteResponse>(`${cBASE_URL_API}/compraPendente`, pFiltros);
    return response.data;
  }
}
