//Axios
import { api } from '@/service/base/Axios';
//Services
import type CClasseFiltro from '@/service/base/CClasseFiltro';
//Models
import CPedidoCompraPendenteModel from '../CPedidoCompraPendenteModel';
import CPedidoCompraPendente from './CPedidoCompraPendenteModel';
//Classes
import CResponseConsultaPaginada from '@/service/base/CResponseConsultaPaginada';
//Constants
import { cBASE_URL_API } from '@/constants/ConstantesRest';

export default class PedidoCompraPendenteController {
  private readonly endpoint = {
    listar: '/pedidoCompraPendente',
  };
  async pedidoCompraPendete(
    pFiltros: CClasseFiltro<CPedidoCompraPendenteModel>,
  ): Promise<CResponseConsultaPaginada<CPedidoCompraPendente>> {
    const response = await api.post<CResponseConsultaPaginada<CPedidoCompraPendente>>(
      `${cBASE_URL_API}${this.endpoint.listar}`,
      pFiltros,
    );

    return response.data;
  }
}

