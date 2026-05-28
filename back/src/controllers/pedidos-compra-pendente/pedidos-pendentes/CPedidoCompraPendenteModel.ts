export default class CPedidoCompraPendenteModel {
  codicoPdc: number = 0;
  dtPrevisaoEntregaPdc: Date = new Date();
  valorTotalPendente: number = 0;

  private constructor(data: Partial<CPedidoCompraPendenteModel>) {
    Object.assign(this, data);
  }

  static create(data: Partial<CPedidoCompraPendenteModel>): CPedidoCompraPendenteModel {
    return new CPedidoCompraPendenteModel(data);
  }

  static fromDatabaseRow(row: any): CPedidoCompraPendenteModel {
    return new CPedidoCompraPendenteModel({
      codicoPdc: row.CODIGO_PDC,
      dtPrevisaoEntregaPdc: row.DTPREVENTREGA_PDC,
      valorTotalPendente: row.VALOR_TOTAL_PENDENTE,
    });
  }
}
