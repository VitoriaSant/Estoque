export default class CResponseConsultaPaginada<Classe> {
  paginacao: {
    pagina: number;
    limite: number;
    totalDeRegistros: number | null;
  } = { pagina: 1, limite: 10, totalDeRegistros: null };

  registros: Classe[] = [];

  constructor(pParams?: Partial<CResponseConsultaPaginada<Classe>>) {
    if (!pParams) return;

    this.paginacao = pParams.paginacao ?? this.paginacao;
    this.registros = pParams.registros ?? this.registros;
  }
}
