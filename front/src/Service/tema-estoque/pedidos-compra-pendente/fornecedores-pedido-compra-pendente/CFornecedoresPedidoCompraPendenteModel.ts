export default class CFornecedoresPedidoCompraPendente{
  fornecedorPdc: number = 0;
  razaoSocialPessoa: string = '';
  totalPedidosComSaldoPendente: number = 0;
  valorTotalPendente: number = 0;

  private constructor(data: Partial<CFornecedoresPedidoCompraPendente>) {
    Object.assign(this, data);
  }
}
