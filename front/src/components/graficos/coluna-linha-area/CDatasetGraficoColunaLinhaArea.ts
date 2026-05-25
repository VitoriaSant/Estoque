export class CGraficoColunaLinhaArea<Classe> {
  campoTitulo: keyof Classe = '' as any;
  campoTipo: keyof Classe = '' as any;
  campoValor: keyof Classe = '' as any;

  constructor(pObj?: Partial<CGraficoColunaLinhaArea<Classe>>) {
    this.campoTitulo = pObj?.campoTitulo ?? this.campoTitulo;
    this.campoTipo = pObj?.campoTipo ?? this.campoTipo;
    this.campoValor = pObj?.campoValor ?? this.campoValor;
  }
}

export default class CDatasetGraficoColunaLinhaArea<Classe> {
  campoLabel: string[] = [];
  campos: CGraficoColunaLinhaArea<Classe>;
  registros: Classe[] = [];

  constructor(pObj?: Partial<CDatasetGraficoColunaLinhaArea<Classe>>) {
    this.campos = new CGraficoColunaLinhaArea<Classe>(pObj?.campos);
    this.registros = pObj?.registros ?? this.registros;
    this.campoLabel = pObj?.campoLabel ?? this.campoLabel;
  }
}
