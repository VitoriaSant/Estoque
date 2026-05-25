// Estrutura dinâmica que representa um ponto/bolha genérico
export type TItemBolhaGenerico = Record<string, any>;

// Estrutura dinâmica que representa uma série/registro genérico
export type TRegistroGenerico = Record<string, any>;

export default class CDatasetGraficoBolha<
  TRegistro extends TRegistroGenerico = TRegistroGenerico,
  TItem extends TItemBolhaGenerico = TItemBolhaGenerico,
> {
  registros: TRegistro[] = [];

  // Mapeamento dos campos do registro pai
  campoLabel: keyof TRegistro;
  campoValor: keyof TRegistro; // Aponta para o array de bolhas

  // Mapeamento dos campos de dentro do array de bolhas
  campoX: keyof TItem;
  campoY: keyof TItem;
  campoTamanhoBolha: keyof TItem;

  constructor(pObj: {
    campoLabel: keyof TRegistro;
    campoValor: keyof TRegistro;
    campoX: keyof TItem;
    campoY: keyof TItem;
    campoTamanhoBolha: keyof TItem;
    registros: TRegistro[];
  }) {
    this.registros = pObj.registros;
    this.campoLabel = pObj.campoLabel;
    this.campoValor = pObj.campoValor;
    this.campoX = pObj.campoX;
    this.campoY = pObj.campoY;
    this.campoTamanhoBolha = pObj.campoTamanhoBolha;
  }
}
