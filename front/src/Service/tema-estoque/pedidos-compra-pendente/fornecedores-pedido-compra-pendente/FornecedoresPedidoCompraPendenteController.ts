//Axios
import { api } from '@/Service/base/Axios';
//Services
import type CClasseFiltro from '@/Service/base/CClasseFiltro';
//Models
import CPedidoCompraPendenteModel from '../CPedidoCompraPendenteModel';
//Interfaces
import type { IFornecedoresPedidoCompraPendente } from '@/Service/tema-estoque/pedidos-compra-pendente/fornecedores-pedido-compra-pendente/IFornecedoresPedidoCompraPendente';
//Constants
import { cBASE_URL_API } from '@/constants/ConstantesRest';

export default class PedidoCompraPendenteController {
  private readonly endpoint = {
    listar: '/fornecedoresPedidoCompraPendente',
  };
  async fornecedorPedidoCompraPendete(
    pFiltros: CClasseFiltro<CPedidoCompraPendenteModel>,
  ): Promise<IFornecedoresPedidoCompraPendente> {
    const response = await api.post<IFornecedoresPedidoCompraPendente>(
      `${cBASE_URL_API}${this.endpoint.listar}`,
      pFiltros,
    );
    return response.data;
  }
}
