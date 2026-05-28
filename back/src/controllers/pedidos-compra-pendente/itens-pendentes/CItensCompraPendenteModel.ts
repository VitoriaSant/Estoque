export default class CItensCompraPendente {
  itemPdc: number = 0;
  descricaoItem: string = '';
  quantidadeItensPendentes: number = 0;
  valorTotalPendente: number = 0;
  mediaValorUn: number = 0;

  private constructor(data: Partial<CItensCompraPendente>) {
    Object.assign(this, data);
  }
  static create(data: Partial<CItensCompraPendente>): CItensCompraPendente {
    return new CItensCompraPendente(data);
  }

  static mapearParaModel(row: any): CItensCompraPendente {
    return new CItensCompraPendente({
      itemPdc: row.ITEM_PDCITEM,
      descricaoItem: row.DESCRICAO_ITEM,
      quantidadeItensPendentes: row.QUANTIDADE_ITENS_PENDETES,
      valorTotalPendente: row.VALOR_TOTAL_PENDENTE,
      mediaValorUn: row.MEDIA_VALOR_UN,
    });
  }
}
