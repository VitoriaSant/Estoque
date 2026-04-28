import { api } from "@/Service/base/Axios";
import type CClasseFiltro from "@/Service/base/CClasseFiltro";
import CPedidoCompraPendenteModel from "./CPedidoCompraPendenteModel";
import type { IPedidoCompraPendenteResponse } from "@/interfaces/IPedidoCompraPendente";

export default class PedidoCompraPendenteController {
  async listarComprasPendentes(
    pFiltros: CClasseFiltro<CPedidoCompraPendenteModel>,
  ): Promise<IPedidoCompraPendenteResponse> {
    const response = await api.post<IPedidoCompraPendenteResponse>(
      `http://localhost:3002/compraPendente`,
      pFiltros,
    );
    return response.data;
  }
}
