export type FormatoCampo = 'moeda' | 'inteiro' | 'data';

export default class FormatterUtils {
  private static formatadores: Record<FormatoCampo, (v: number) => string> = {
    moeda: (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v),
    inteiro: (v) => Math.floor(v).toString(),
    data: (v) => new Intl.DateTimeFormat('pt-BR').format(new Date(v)),
  };

  public static formatarValor(valor: number | undefined | null, campo: FormatoCampo): string {
    if (valor === undefined || valor === null) return '';
    const formatador = this.formatadores[campo];
    return formatador ? formatador(valor) : valor.toString();
  }
}
