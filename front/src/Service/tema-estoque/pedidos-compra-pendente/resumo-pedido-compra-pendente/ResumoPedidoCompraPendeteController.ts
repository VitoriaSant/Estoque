//Axios
import { api } from '@/service/base/Axios';
//Services
import type CClasseFiltro from '@/service/base/CClasseFiltro';
//Classe
import type CPedidoCompraPendenteGeralModel from '../CPedidoCompraPendenteGeralModel';
import CResponseConsulta from '@/service/base/CResponseConsulta';
import CResumoPedidoCompraPendente from './CResumoPedidoCompraPendenteModel';

//Constants
import { cBASE_URL_API } from '@/constants/ConstantesRest';

export default class PedidoCompraPendenteController {
  private readonly endpoint = {
    listar: '/resumoPedidoCompraPendente',
  };
  async resumoPedidoCompraPendete(
    pFiltros: CClasseFiltro<CPedidoCompraPendenteGeralModel>,
  ): Promise<CResponseConsulta<CResumoPedidoCompraPendente>> {
    const response = await api.post<CResponseConsulta<CResumoPedidoCompraPendente>>(
      `${cBASE_URL_API}${this.endpoint.listar}`,
      pFiltros,
    );
    return response.data;
  }
}
