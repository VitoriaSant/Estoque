export default class CPedidoCompraPendenteModel {
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

  private constructor(data: Partial<CPedidoCompraPendenteModel>) {
    Object.assign(this, data);
  }
}
