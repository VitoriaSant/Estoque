//Classe
import CResponseConsultaPaginada from '@/service/base/CResponseConsultaPaginada';

export interface IItensCompraPendente {
  FORNECEDOR_PDC: number;
  RAZAOSOCIAL_PESSOA: String;
  TOTAL_PEDIDOS_COM_SALDO_PENDENTE: number;
  VALOR_TOTAL_PENDENTE: number;
}
export type TPedidoCompraPendenteResponse = CResponseConsultaPaginada<IItensCompraPendente>;
