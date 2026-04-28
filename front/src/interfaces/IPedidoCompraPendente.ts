export interface IPedidoCompraPendenteResponse {
  resumo: {
    qntPedidoEmAtraso: number;
    somaPedidoEmAtraso: number;
    totalDePedidos: number;
    somaTotal: number;
  };
  pedidosPorFornecedor?: Array<{
    fornecedorId: number;
    fornecedorNome: string;
    quantidadePedidosFornecedor: number;
    valorTotalFornecedor: number;
  }>;
  pedidosPendentes?: Array<{
    pedidoId: number;
    previsaoEntregaPedido: string;
    fornecedorNome: string;
    valorTotalPedido: number;
  }>;
  itensPendentes?: Array<{
    IdItem: number;
    descricaoItem: string;
    valorTotalItem: number;
    quantidadeItens: number;
    valorUnitarioItem: number;
  }>;
}
