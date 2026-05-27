export default class CResumoPedidoCompraPendente {
  totalPedidosComSaldo: number = 0;
  valorTotal: number = 0;
  totalPedidosAtrasados: number = 0;
  valorTotalAtrasado: number = 0;

  private constructor(data: Partial<CResumoPedidoCompraPendente>) {
    Object.assign(this, data);
  }

  static create(data: Partial<CResumoPedidoCompraPendente>): CResumoPedidoCompraPendente {
    return new CResumoPedidoCompraPendente(data);
  }

  static fromDatabaseRow(row: any): CResumoPedidoCompraPendente {
    return new CResumoPedidoCompraPendente({
      totalPedidosComSaldo: row.TOTAL_PEDIDOS_COM_SALDO_PENDENTE,
      valorTotal: row.VALOR_TOTAL_PENDENTE,
      totalPedidosAtrasados: row.TOTAL_PEDIDOS_ATRASADOS,
      valorTotalAtrasado: row.VALOR_TOTAL_ATRASADO,
    });
  }
}
