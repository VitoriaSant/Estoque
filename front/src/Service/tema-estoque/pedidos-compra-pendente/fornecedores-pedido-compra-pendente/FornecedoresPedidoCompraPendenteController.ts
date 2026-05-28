//Axios
import { api } from '@/service/base/Axios';
//Services
import type CClasseFiltro from '@/service/base/CClasseFiltro';
//Models
import CPedidoCompraPendenteGeralModel from '../CPedidoCompraPendenteGeralModel';
//Interfaces
import type { IFornecedoresPedidoCompraPendente } from '@/service/tema-estoque/pedidos-compra-pendente/fornecedores-pedido-compra-pendente/IFornecedoresPedidoCompraPendente';
//Constants
import { cBASE_URL_API } from '@/constants/ConstantesRest';

export default class PedidoCompraPendenteController {
  private readonly endpoint = {
    listar: '/fornecedoresPedidoCompraPendente',
  };
  async fornecedorPedidoCompraPendete(
    pFiltros: CClasseFiltro<CPedidoCompraPendenteGeralModel>,
  ): Promise<IFornecedoresPedidoCompraPendente> {
    const response = await api.post<IFornecedoresPedidoCompraPendente>(
      `${cBASE_URL_API}${this.endpoint.listar}`,
      pFiltros,
    );
    return response.data;
  }
}
