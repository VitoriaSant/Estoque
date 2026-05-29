//Axios
import { api } from '@/service/base/Axios';
//Services
import type CClasseFiltro from '@/service/base/CClasseFiltro';
//Classe
import CPedidoCompraPendenteGeralModel from '../CPedidoCompraPendenteGeralModel';
import CFornecedoresPedidoCompraPendente from './CFornecedoresPedidoCompraPendenteModel';
import CResponseConsultaPaginada from '@/service/base/CResponseConsultaPaginada';

//Constants
import { cBASE_URL_API } from '@/constants/ConstantesRest';

export default class PedidoCompraPendenteController {
  private readonly endpoint = {
    listar: '/fornecedoresPedidoCompraPendente',
  };
  async fornecedorPedidoCompraPendete(
    pFiltros: CClasseFiltro<CPedidoCompraPendenteGeralModel>,
  ): Promise<CResponseConsultaPaginada<CFornecedoresPedidoCompraPendente>> {
    const response = await api.post<CResponseConsultaPaginada<CFornecedoresPedidoCompraPendente>>(
      `${cBASE_URL_API}${this.endpoint.listar}`,
      pFiltros,
    );
    return response.data;
  }
}
