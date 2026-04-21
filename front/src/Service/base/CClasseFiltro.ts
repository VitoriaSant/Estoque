type TOperadorFiltro = "IGUAL" | "DIFERENTE" | "MAIOR" | "MENOR" | "CONTEM";

class CFiltro<Classe> { 
  campo: keyof Classe = "" as any;
  operador: TOperadorFiltro = "IGUAL";
  valor: any = "";
}

export default class CClasseFiltro<Classe> {

  filtros: CFiltro<Classe>[] = [];

  constructor(pObj?: Partial<CClasseFiltro<Classe>>) {
    if (pObj) {
      Object.assign(this, pObj);
    }
    this.filtros = this.filtros ?? [];
  }
}