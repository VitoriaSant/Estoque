export default class CPedidoCompraPendente {
  codicoPdc: number = 0;
  dtPrevisaoEntregaPdc: Date = new Date();
  valorTotalPendente: number = 0;

  private constructor(data: Partial<CPedidoCompraPendente>) {
    Object.assign(this, data);
  }

  static create(data: Partial<CPedidoCompraPendente>): CPedidoCompraPendente {
    return new CPedidoCompraPendente(data);
  }

  static fromDatabaseRow(row: any): CPedidoCompraPendente {
    return new CPedidoCompraPendente({
      codicoPdc: row.CODIGO_PDC,
      dtPrevisaoEntregaPdc: row.DTPREVENTREGA_PDC,
      valorTotalPendente: row.VALOR_TOTAL_PENDENTE,
    });
  }
}
