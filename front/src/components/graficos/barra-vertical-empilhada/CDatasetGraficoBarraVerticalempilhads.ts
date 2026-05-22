export class CGraficoBarraVerticalEmpilhada<Classe> {
  campoTitulo: keyof Classe = '' as any;
  campoValor: keyof Classe = '' as any;

  constructor(pObj?: Partial<CGraficoBarraVerticalEmpilhada<Classe>>) {
    this.campoTitulo = pObj?.campoTitulo ?? this.campoTitulo;
    this.campoValor = pObj?.campoValor ?? this.campoValor;
  }
}

export default class CDatasetGraficoBarraVerticalempilhada<Classe> {
  campoLabel: number[] = [];
  registros: Classe[] = [];

  constructor(pObj?: Partial<CDatasetGraficoBarraVerticalempilhada<Classe>>) {
    this.registros = pObj?.registros ?? this.registros;
    this.campoLabel = pObj?.campoLabel ?? this.campoLabel;
  }
}
