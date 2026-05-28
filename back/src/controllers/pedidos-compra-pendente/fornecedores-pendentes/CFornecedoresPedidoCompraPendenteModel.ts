export default class CFornecedoresPedidoCompraPendente {
  fornecedorPdc: number = 0;
  razaoSocialPessoa: string = '';
  totalPedidosComSaldoPendente: number = 0;
  valorTotalPendente: number = 0;

  private constructor(data: Partial<CFornecedoresPedidoCompraPendente>) {
    Object.assign(this, data);
  }
  static create(data: Partial<CFornecedoresPedidoCompraPendente>): CFornecedoresPedidoCompraPendente {
    return new CFornecedoresPedidoCompraPendente(data);
  }

  static mapearParaModel(row: any): CFornecedoresPedidoCompraPendente {
    return new CFornecedoresPedidoCompraPendente({
      fornecedorPdc: row.FORNECEDOR_PDC,
      razaoSocialPessoa: row.RAZAOSOCIAL_PESSOA,
      totalPedidosComSaldoPendente: row.TOTAL_PEDIDOS_COM_SALDO_PENDENTE,
      valorTotalPendente: row.VALOR_TOTAL_PENDENTE,
    });
  }
}
