//Axios
import { api } from '@/Service/base/Axios';
//Services
import type CClasseFiltro from '@/Service/base/CClasseFiltro';
//Models
import CPedidoCompraPendenteModel from '../CPedidoCompraPendenteModel';
//Interfaces
import type { IPedidoCompraPendente } from '@/Service/tema-estoque/pedidos-compra-pendente/pedido-compra-pendente/IPedidoCompraPendente';
//Classes
import CResponseConsultaPaginada from '@/Service/base/CResponseConsultaPaginada';
//Constants
import { cBASE_URL_API } from '@/constants/ConstantesRest';

export default class PedidoCompraPendenteController {
  private readonly endpoint = {
    listar: '/pedidoCompraPendente',
  };
  async pedidoCompraPendete(
    pFiltros: CClasseFiltro<CPedidoCompraPendenteModel>,
  ): Promise<CResponseConsultaPaginada<CPedidoCompraPendenteModel>> {
    const response = await api.post<CResponseConsultaPaginada<CPedidoCompraPendenteModel>>(
      `${cBASE_URL_API}${this.endpoint.listar}`,
      pFiltros,
    );

    return response.data;
  }
}
