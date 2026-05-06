<template>
    <div>
        <Linha1-CardPontoCompra :key="`cards-${layoutStore.classeFiltro?.dataInicio || 'default'}`"/>
        <Linha2-PontoDeCompra :key="`cards-${layoutStore.classeFiltro?.dataInicio || 'default'}`"/>
    </div>
</template>

<script setup lang="ts">
import { useLayoutDashboardStore } from "@/stores/LayoutDashboardStore";
import Linha1CardPontoCompra from './components/Linha1-CardPontoCompra.vue';
import Linha2PontoDeCompra from './components/Linha2-PontoDeCompra.vue';

const layoutStore = useLayoutDashboardStore();
</script>

<style scoped>
</style>