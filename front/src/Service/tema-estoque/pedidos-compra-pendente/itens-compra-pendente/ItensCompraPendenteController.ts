//Axios
import { api } from '@/service/base/Axios';
//Services
import type CClasseFiltro from '@/service/base/CClasseFiltro';
//Models
import CPedidoCompraPendenteGeralModel from '../CPedidoCompraPendenteGeralModel';
//Interfaces
import type { IItensCompraPendente } from '@/service/tema-estoque/pedidos-compra-pendente/itens-compra-pendente/IItensCompraPendente';
//Constants
import { cBASE_URL_API } from '@/constants/ConstantesRest';

export default class PedidoCompraPendenteController {
  private readonly endpoint = {
    listar: '/itensCompraPendente',
  };
  async itensPedidoCompraPendete(
    pFiltros: CClasseFiltro<CPedidoCompraPendenteGeralModel>,
  ): Promise<IItensCompraPendente> {
    const response = await api.post<IItensCompraPendente>(`${cBASE_URL_API}${this.endpoint.listar}`, pFiltros);
    return response.data;
  }
}
