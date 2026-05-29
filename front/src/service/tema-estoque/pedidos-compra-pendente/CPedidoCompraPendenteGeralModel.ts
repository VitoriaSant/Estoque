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

  private constructor(data: Partial<CPedidoCompraPendenteGeralModel>) {
    Object.assign(this, data);
  }

  // Mapeamento de nomes amigáveis para nomes técnicos do modelo
  static readonly mapaCampos: Record<string, keyof CPedidoCompraPendenteGeralModel> = {
    'Código do Fornecedor': 'fornecedorId',
    Fornecedor: 'razaoSocialFornecedor',
    'Código do Item': 'itemId',
    Item: 'descricaoItem',
    'Código da Cor': 'corId',
    Cor: 'descricaoCor',
    'Código da Variação': 'variacaoId',
    Variação: 'descricaoVariacao',
    'Código do Acabamento': 'acabamentoId',
    Acabamento: 'descricaoAcabamento',
  };

  static getMapaCampos() {
    return CPedidoCompraPendenteGeralModel.mapaCampos;
  }
}
