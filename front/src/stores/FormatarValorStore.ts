import { defineStore } from "pinia";

export const useFormatarValorStore = defineStore(
    "[FormatarValorStore]",
    () => {

        const formatarValor = (valor: number, campo: string) => {
        if (!valor) return "";

        // Formatar moeda para campos de valor
        if (campo.includes("VLR") || campo.toLowerCase().includes("valor")) {
            return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
            }).format(valor);
        }

        // Formatar data para campos de data
        if (
            campo.includes("DATA") ||
            campo.toLowerCase().includes("dtemissao") ||
            campo.toLowerCase().includes("dtpreventrega")
        ) {
            return new Date(valor).toLocaleDateString("pt-BR");
        }

        return valor;
        };

        return {
        formatarValor,
        };
    }
);
