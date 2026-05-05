
import { api } from "@/Service/base/Axios";
import CClasseFiltro from "@/Service/base/CClasseFiltro";
import CPontoDeCompraModel from "./CPontoDeCompraModel";
import type { IPontoDeCompraResponse } from "@/interfaces/IPontoDeCompraResponse";

export default class PontoDeCompraController {
    async listarPontoDeCompra(
        pFiltro: CClasseFiltro<CPontoDeCompraModel>,
    ): Promise<IPontoDeCompraResponse> {
        const response = await api.post<IPontoDeCompraResponse>(
            `http://localhost:3002/pontoDeCompra`,
            pFiltro,
        );
        return response.data;
    }
}
