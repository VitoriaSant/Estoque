import { api } from "@/Service/base/Axios";
import type CClasseFiltro from "@/Service/base/CClasseFiltro";
import CPedidoCompraPendenteModel from "./CPedidoCompraPendenteModel";

export default class PedidoCompraPendenteController {
  async listarComprasPendentes(
    pFiltros: CClasseFiltro<CPedidoCompraPendenteModel>,
  ): Promise<CPedidoCompraPendenteModel[]> {
    const response = await api.post<CPedidoCompraPendenteModel[]>(
      `http://localhost:3002/compraPendente`,
      pFiltros,
    );
    return response.data;
  }
}
