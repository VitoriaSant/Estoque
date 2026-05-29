import CResponseConsulta from "./CResponseConsulta";

export default class CResponseConsultaPaginada<Classe> extends CResponseConsulta<Classe> {
  paginacao: {
    pagina: number;
    limite: number;
    totalDeRegistros: number | null;
  } = { pagina: 1, limite: 10, totalDeRegistros: null };

  constructor(pParams?: Partial<CResponseConsultaPaginada<Classe>>) {
    super(pParams)
    
    if (!pParams) return;

    this.paginacao = pParams.paginacao ?? this.paginacao;
  }
  toJSON() {
    return {
      paginacao: this.paginacao,
      registros: this.registros,
    };
  }
}
