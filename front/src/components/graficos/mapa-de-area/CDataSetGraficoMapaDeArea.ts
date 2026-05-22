export default class CDatasetGraficoBarraHorizontal<Classe> {
  registros: Classe[] = [];
  campoTitulo: keyof Classe = '' as any;
  campoValor: keyof Classe = '' as any;

  constructor(pObj?: Partial<CDatasetGraficoBarraHorizontal<Classe>>) {
    this.registros = pObj?.registros ?? this.registros;
    this.campoTitulo = pObj?.campoTitulo ?? this.campoTitulo;
    this.campoValor = pObj?.campoValor ?? this.campoValor;
  }
}
