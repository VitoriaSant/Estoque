export default class CResumoPedidoCompraPendente {
  totalPedidosAtrasados: number = 0;
  valorTotal: number = 0;
  totalPedidosComSaldo: number = 0;
  valorTotalAtrasado: number = 0;

  private constructor(data: Partial<CResumoPedidoCompraPendente>) {
    Object.assign(this, data);
  }
}
