export class ComprasPendentes {
    codigo_pdc: number;
    empresa_pdc: number;
    dtemissao_pdc: string;
    dtpreventrega_pdc: string;
    fornecedor_pdc: number;
    razaosocial_pessoa: string;
    item_pdcitem: number;
    descricao_item: string;
    variacao_pdcitem: number;
    descricao_variacao: string;
    cor_pdcitem: number;
    descricao_cor: string;
    acabamento_pdcitem: number;
    descricao_acabamento: string;
    qtdeaberta_pdcitemdet: number;
    vlrunitarioliquido_pdcitemdet: number;

    constructor(
        codigo_pdc: number,
        empresa_pdc: number,
        dtemissao_pdc: string,
        dtpreventrega_pdc: string,
        fornecedor_pdc: number,
        razaosocial_pessoa: string,
        item_pdcitem: number,
        descricao_item: string,
        variacao_pdcitem: number,
        descricao_variacao: string,
        cor_pdcitem: number,
        descricao_cor: string,
        acabamento_pdcitem: number,
        descricao_acabamento: string,
        qtdeaberta_pdcitemdet: number,
        vlrunitarioliquido_pdcitemdet: number,
    ) {
        this.codigo_pdc = codigo_pdc;
        this.empresa_pdc = empresa_pdc;
        this.dtemissao_pdc = dtemissao_pdc;
        this.dtpreventrega_pdc = dtpreventrega_pdc;
        this.fornecedor_pdc = fornecedor_pdc;
        this.razaosocial_pessoa = razaosocial_pessoa;
        this.item_pdcitem = item_pdcitem;
        this.descricao_item = descricao_item;
        this.variacao_pdcitem = variacao_pdcitem;
        this.descricao_variacao = descricao_variacao;
        this.cor_pdcitem = cor_pdcitem;
        this.descricao_cor = descricao_cor;
        this.acabamento_pdcitem = acabamento_pdcitem;
        this.descricao_acabamento = descricao_acabamento;
        this.qtdeaberta_pdcitemdet = qtdeaberta_pdcitemdet;
        this.vlrunitarioliquido_pdcitemdet = vlrunitarioliquido_pdcitemdet;
    }
}

export default ComprasPendentes;
