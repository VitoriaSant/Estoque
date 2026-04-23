type TOperadorFiltro = "IGUAL" | "DIFERENTE" | "MAIOR" | "MENOR" | "CONTEM";
type TOperadorSQL = "=" | "<>" | ">" | "LIKE";

export class CFiltro<Classe> {
  campo: keyof Classe = "" as any;
  operador: TOperadorFiltro = "IGUAL";
  valor: any = "";

  constructor(pObj?: Partial<CFiltro<Classe>>) {
    this.campo = pObj?.campo ?? this.campo;
    this.operador = pObj?.operador ?? this.operador;
    this.valor = pObj?.valor ?? this.valor;
  }

  static toOperadorSQL(pOperador: TOperadorFiltro): TOperadorSQL {
    switch (pOperador) {
      case "IGUAL":
        return "=";

      case "DIFERENTE":
        return "<>";

      case "CONTEM":
        return "LIKE";

      default:
        throw `O operador: "${pOperador}" não foi mapeado na função.`;
    }
  }
}

export default class CClasseFiltro<Classe> {
  dataInicio?: Date;
  dataFim?: Date;
  filtros: CFiltro<Classe>[] = [];

  constructor(
    pObj?: Partial<
      CClasseFiltro<Classe> & { dataInicio?: string | Date; dataFim?: string | Date }
    >,
  ) {
    if (pObj?.filtros && Array.isArray(pObj.filtros)) {
      this.filtros = pObj.filtros.map((item) => new CFiltro(item));
    }
    this.filtros = pObj?.filtros ?? this.filtros;
    
    this.dataInicio = pObj?.dataInicio ? new Date(pObj.dataInicio) : undefined;
    this.dataFim = pObj?.dataFim ? new Date(pObj.dataFim) : undefined;
    
    console.log("Constructor CClasseFiltro:", this.filtros);
  }
}