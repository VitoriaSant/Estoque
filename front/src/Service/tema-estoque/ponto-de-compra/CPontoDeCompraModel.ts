export default class CPontoDeCompraModel {
    itemId: number = 0;
    descricaoItem: string = "";
    empresaItem: number = 0;
    empresaPDC: number = 0;
    empresaReqest: number = 0;
    variacaoId: number = 0;
    descricaoVariacao: string = "";
    corId: number = 0;
    descricaoCor: string = "";
    acabamentoId: number = 0;
    descricaoAcabamento: string = "";
    saldoAtual: number = 0;
    custoCompraAtual: number = 0;
    estoqueMinimo: number = 0;
    estoqueMaximo: number = 0;
    pdcId: number = 0;
    dataPrevisaoEntrega: string = "";
    itemPDC: number = 0;
    quantidadeAberta: number = 0;
    valorUnitarioLiquido: number = 0;
    quantidadeRequisicao: number = 0;
    dataRequisicao: string = "";
    dataEmissao: string = "";

    private constructor(data: Partial<CPontoDeCompraModel>) {
        Object.assign(this, data);
    }

}
