import CClasseFiltro from './CClasseFiltro';

export default class CQueryBuilderSQL {
  static verificarExistencia<T>(pCampo: keyof T, pClasseFiltro: CClasseFiltro<T>): boolean {
    for (const filtro of pClasseFiltro.filtros) {
      if (filtro.campo === pCampo) {
        return true;
      }
    }
    return false;
  }

  static obterValorFormatado(filtro: any): any {
    if (filtro.operador !== 'CONTEM') {
      return filtro.valor;
    }
    return `%${filtro.valor}%`;
  }
}
