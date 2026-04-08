type TOperadorFiltro = "IGUAL" | "DIFERENTE" | "MAIOR" | "MENOR";

class CFiltro<Classe> {
  campo: keyof Classe = "" as any;
  operador: TOperadorFiltro = "IGUAL";
  valor: any = "";
}

export default class CClasseFiltro<Classe> {
  filtros: CFiltro<Classe>[] = [];

  constructor(pObj?: Partial<CClasseFiltro<Classe>>) {
    this.filtros = pObj?.filtros ?? this.filtros;
    console.log("CClasseFiltro", this);
  }
}
