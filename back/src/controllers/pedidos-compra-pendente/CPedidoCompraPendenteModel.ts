export default class CPedidoCompraPendenteModel {
  codigo: number = 0;
  empresaId: number = 0;
  dataEmissao: Date | null = null;
  dataPrevisaoEntrega: Date | null = null;
  fornecedorId: number = 0;
  razaoSocialFornecedor: string = "";
  itemId: number = 0;
  descricaoItem: string = "";
  variacaoId: number = 0;
  descricaoVariacao: string = "";
  corId: number = 0;
  descricaoCor: string = "";
  acabamentoId: number = 0;
  descricaoAcabamento: string = "";
  quantidadeAberta: number = 0;
  valorUnitarioLiquido: number = 0;

  private constructor(data: Partial<CPedidoCompraPendenteModel>) {
    Object.assign(this, data);
  }
}
