<template>
    <Linha1-Cards />
    <Linha2-PedidoPendente-FornecedorAtraso />
    <Linha3-PedidoPendente-ItensPendentes />
    {{ layoutStore.classeFiltro }}
</template>

<script setup lang="ts">
import { useLayoutDashboardStore } from "@/stores/LayoutDashboardStore";
const layoutStore = useLayoutDashboardStore();

// Coponentes
import Linha1Cards from "./components/Linha1-Cards.vue";
import Linha2PedidoPendenteFornecedorAtraso from "./components/Linha2-PedidoPendente-FornecedorAtraso.vue";
import Linha3PedidoPendenteItensPendentes from "./components/Linha3-PedidoPendente-ItensPendentes.vue";

</script>