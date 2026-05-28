//Axios
import { api } from '@/service/base/Axios';
//Services
import type CClasseFiltro from '@/service/base/CClasseFiltro';
//Models
import CPedidoCompraPendenteModel from '../CPedidoCompraPendenteModel';
//Interfaces
import type { IResumopedidoCompraPendete } from '@/service/tema-estoque/pedidos-compra-pendente/resumo-pedido-compra-pendente/IResumoPedidoCompraPendete';
//Constants
import { cBASE_URL_API } from '@/constants/ConstantesRest';

export default class PedidoCompraPendenteController {
  private readonly endpoint = {
    listar: '/resumoPedidoCompraPendente',
  };
  async resumoPedidoCompraPendete(
    pFiltros: CClasseFiltro<CPedidoCompraPendenteModel>,
  ): Promise<IResumopedidoCompraPendete> {
    const response = await api.post<IResumopedidoCompraPendete>(`${cBASE_URL_API}${this.endpoint.listar}`, pFiltros);
    return response.data;
  }
}

