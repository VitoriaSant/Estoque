import CResponseConsultaPaginada from '@/service/base/CResponseConsultaPaginada';

export interface IItensCompraPendente {
  ITEM_PDCITEM: number;
  DESCRICAO_ITEM: String;
  QUANTIDADE_ITENS_PENDETES: number;
  VALOR_TOTAL_PENDENTE: number;
  MEDIA_VALOR_UN: number;
}
export type TPedidoCompraPendenteResponse = CResponseConsultaPaginada<IItensCompraPendente>;
