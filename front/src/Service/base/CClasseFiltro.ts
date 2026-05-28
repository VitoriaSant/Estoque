type TOperadorFiltro = 'IGUAL' | 'DIFERENTE' | 'MAIOR' | 'MENOR' | 'CONTEM';

class CFiltro<Classe> {
  campo: keyof Classe = '' as any;
  operador: TOperadorFiltro = 'IGUAL';
  valor: any = '';
}

export default class CClasseFiltro<Classe> {
  paginacao: {
    pagina: number;
    limite: number;
    totalDeRegistros: number | null;
  } = { pagina: 1, limite: 10, totalDeRegistros: null };

  dataInicio?: Date;
  dataFim?: Date;
  filtros: CFiltro<Classe>[] = [];

  constructor(pObj?: Partial<CClasseFiltro<Classe>>) {
    if (pObj) {
      Object.assign(this, pObj);
    }

    this.paginacao = this.paginacao ?? {
      pagina: 1,
      limite: 10,
      totalDeRegistros: null,
    };

    this.filtros = this.filtros ?? [];
    this.dataInicio = this.dataInicio ?? undefined;
    this.dataFim = this.dataFim ?? undefined;
  }
}
