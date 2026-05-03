<template>
    <div>
        <Linha1-Cards-PedidoPendente :key="`cards-${layoutStore.classeFiltro?.dataInicio || 'default'}`" />
        <Linha2-PedidoPendente-FornecedorAtraso :key="`itens-${layoutStore.classeFiltro?.dataInicio || 'default'}`"/>
        <Linha3-PedidoPendente-ItensPendentes :key="`itens-${layoutStore.classeFiltro?.dataInicio || 'default'}`" />
    </div>
    {{ layoutStore.classeFiltro }}
</template>

<script setup lang="ts">
import { useLayoutDashboardStore } from "@/stores/LayoutDashboardStore";
const layoutStore = useLayoutDashboardStore();

// Coponentes
import Linha1CardsPedidoPendente from "./components/Linha1-Cards-PedidoPendente.vue";
import Linha2PedidoPendenteFornecedorAtraso from "./components/Linha2-PedidoPendente-FornecedorAtraso.vue";
import Linha3PedidoPendenteItensPendentes from "./components/Linha3-PedidoPendente-ItensPendentes.vue";

</script>