export interface IPontoDeCompraResponse {
    resumo: {
        valorTotalEmEstoque: number;
        valorTotalDePedidosPendentes: number;
        valorTotal: number;
    },
    pontoDeCompra?: Array<{
        itemId: number;
        descricaoItem: string;
        saldoDisponivel: number;
        saldoMinimo: number;
        saldoMaximo: number;
        pedidoCompraPendente: number;
        prazoEntrega: number;
        consumoDiario: number;
        diasDeDuracao: number | null;
    }>;
}
