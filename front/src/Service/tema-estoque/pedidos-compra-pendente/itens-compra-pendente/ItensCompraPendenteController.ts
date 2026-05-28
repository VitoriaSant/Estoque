//Axios
import { api } from '@/service/base/Axios';
//Services
import type CClasseFiltro from '@/service/base/CClasseFiltro';
//Constants
import { cBASE_URL_API } from '@/constants/ConstantesRest';

//Classes
import CResponseConsultaPaginada from '@/service/base/CResponseConsultaPaginada';
import CPedidoCompraPendenteGeralModel from '../CPedidoCompraPendenteGeralModel';
import CItensCompraPendente from './CItensCompraPendenteModel';

export default class PedidoCompraPendenteController {
  private readonly endpoint = {
    listar: '/itensCompraPendente',
  };
  async itensPedidoCompraPendete(
    pFiltros: CClasseFiltro<CPedidoCompraPendenteGeralModel>,
  ): Promise<CResponseConsultaPaginada<CItensCompraPendente>> {
    const response = await api.post<CResponseConsultaPaginada<CItensCompraPendente>>(
      `${cBASE_URL_API}${this.endpoint.listar}`,
      pFiltros,
    );
    return response.data;
  }
}
