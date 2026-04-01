import { api } from "./api";
import ComprasPendentes from "../class/ComprasPendentes";

export class CompraPendenteService {
async listarComprasPendentes(
    fornecedorId: number,
): Promise<ComprasPendentes[]> {
    const response = await api.post<ComprasPendentes[]>(
    `http://localhost:3001/compraPendente`,
    { fornecedorId },
    );
    return response.data;
}
}
