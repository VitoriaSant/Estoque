import { api } from '@/Service/base/Axios';
import type CClasseFiltro from '@/Service/base/CClasseFiltro';
import CPedidoCompraPendenteModel from './CPedidoCompraPendenteModel';
import type { IPedidoCompraPendenteResponse } from '@/interfaces/IPedidoCompraPendenteResonse';
import { cBASE_URL_API } from '@/constants/ConstantesRest';

export default class PedidoCompraPendenteController {
  async listarComprasPendentes(
    pFiltros: CClasseFiltro<CPedidoCompraPendenteModel>,
  ): Promise<IPedidoCompraPendenteResponse> {
    const response = await api.post<IPedidoCompraPendenteResponse>(`${cBASE_URL_API}/compraPendente`, pFiltros);
    return response.data;
  }
}
