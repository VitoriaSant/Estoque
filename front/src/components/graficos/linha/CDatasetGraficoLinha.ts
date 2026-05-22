export class CGraficoLinha<Classe> {
  campoTitulo: keyof Classe = '' as any;
  campoValor: keyof Classe = '' as any;

  constructor(pObj?: Partial<CGraficoLinha<Classe>>) {
    this.campoTitulo = pObj?.campoTitulo ?? this.campoTitulo;
    this.campoValor = pObj?.campoValor ?? this.campoValor;
  }
}

export default class CDatasetGraficoLinha<Classe> {
  campoLabel: number[] = [];
  campos: CGraficoLinha<Classe>;
  registros: Classe[] = [];

  constructor(pObj?: Partial<CDatasetGraficoLinha<Classe>>) {
    this.registros = pObj?.registros ?? this.registros;
    this.campos = new CGraficoLinha<Classe>(pObj?.campos);
    this.campoLabel = pObj?.campoLabel ?? this.campoLabel;
  }
}
