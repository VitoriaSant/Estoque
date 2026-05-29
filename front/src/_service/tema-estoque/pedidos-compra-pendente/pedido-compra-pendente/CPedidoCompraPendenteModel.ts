export default class CPedidoCompraPendente {
  codicoPdc: number = 0;
  dtPrevisaoEntregaPdc: Date = new Date();
  valorTotalPendente: number = 0;

  private constructor(data: Partial<CPedidoCompraPendente>) {
    Object.assign(this, data);
  }
}
