export default class CDatasetGraficoDonuts<Classe> {
  registros: Classe[] = [];
  campoLabel: keyof Classe = '' as any;
  campoValor: keyof Classe = '' as any;

  constructor(pObj?: Partial<CDatasetGraficoDonuts<Classe>>) {
    this.registros = pObj?.registros ?? this.registros;
    this.campoLabel = pObj?.campoLabel ?? this.campoLabel;
    this.campoValor = pObj?.campoValor ?? this.campoValor;
  }
}
