export default class CorDeAlerta {
  public static alerta(pData: Date | undefined | null): string {
    if (pData === undefined || pData === null) return '';

    const diaAtual = new Date();

    const tempoData = new Date(pData).getTime();
    const tempoAtual = diaAtual.getTime();

    if (tempoData < tempoAtual) {
      return 'Vermelho';
    }

    return '';
  }
}
