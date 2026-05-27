//Axios
import { api } from '@/Service/base/Axios';
//Services
import type CClasseFiltro from '@/Service/base/CClasseFiltro';
//Models
import CPedidoCompraPendenteModel from '../CPedidoCompraPendenteModel';
//Interfaces
import type { IItensCompraPendente } from '@/Service/tema-estoque/pedidos-compra-pendente/itens-compra-pendente/IItensCompraPendente';
//Constants
import { cBASE_URL_API } from '@/constants/ConstantesRest';

export default class PedidoCompraPendenteController {
  private readonly endpoint = {
    listar: '/itensCompraPendente',
  };
  async itensPedidoCompraPendete(pFiltros: CClasseFiltro<CPedidoCompraPendenteModel>): Promise<IItensCompraPendente> {
    const response = await api.post<IItensCompraPendente>(`${cBASE_URL_API}${this.endpoint.listar}`, pFiltros);
    return response.data;
  }
}
