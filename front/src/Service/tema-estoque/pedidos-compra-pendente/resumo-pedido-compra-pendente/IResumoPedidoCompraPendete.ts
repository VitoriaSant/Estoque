import CResponseConsulta from '@/service/base/CResponseConsulta';

export interface IResumopedidoCompraPendete {
  TOTAL_PEDIDOS_COM_SALDO_PENDENTE: number;
  VALOR_TOTAL_PENDENTE: number;
  TOTAL_PEDIDOS_ATRASADOS: number;
  VALOR_TOTAL_ATRASADO: number;
}
export type TResumoCompraPendenteResponse = CResponseConsulta<IResumopedidoCompraPendete>;
