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

}
