export default class CPedidoCompraPendenteGeralModel {
  fornecedorId: number = 0;
  razaoSocialFornecedor: string = '';
  itemId: number = 0;
  descricaoItem: string = '';
  variacaoId: number = 0;
  descricaoVariacao: string = '';
  corId: number = 0;
  descricaoCor: string = '';
  acabamentoId: number = 0;
  descricaoAcabamento: string = '';
  dataInicio: Date = new Date();
  dataFim: Date = new Date();

  private constructor(data: Partial<CPedidoCompraPendenteGeralModel>) {
    Object.assign(this, data);
  }
}
