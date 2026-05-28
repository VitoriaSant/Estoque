import CResponseConsultaPaginada from '@/service/base/CResponseConsultaPaginada';

export interface IPedidoCompraPendente {
  codicoPdc: number;
  dtPrevisaoEntregaPdc: Date;
  valorTotalPendente: number;
}

export type TPedidoCompraPendenteResponse = CResponseConsultaPaginada<IPedidoCompraPendente>;

