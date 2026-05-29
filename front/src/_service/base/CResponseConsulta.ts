export default class CResponseConsulta<Classe> {
  registros: Classe[] = [];

  constructor(pParams?: Partial<CResponseConsulta<Classe>>) {
    if (!pParams) return;

    this.registros = pParams.registros ?? this.registros;
  }
}
