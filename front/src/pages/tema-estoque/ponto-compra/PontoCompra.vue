<template>
    <div>
        <Linha1-CardPontoCompra :key="`cards-${layoutStore.classeFiltro?.dataInicio || 'default'}`"/>
        <Linha2-CosumoUltimos12meses :key="`cards-${layoutStore.classeFiltro?.dataInicio || 'default'}`"/>
        <Linha3-PontoDeCompra :key="`cards-${layoutStore.classeFiltro?.dataInicio || 'default'}`"/>
        
    </div>
</template>

<script setup lang="ts">
import { useLayoutDashboardStore } from "@/stores/LayoutDashboardStore";
import Linha1CardPontoCompra from './components/Linha1-CardPontoCompra.vue';
import Linha2CosumoUltimos12meses from './components/Linha3-CosumoUltimos12meses.vue';
import Linha3PontoDeCompra from './components/Linha2-PontoDeCompra.vue';


const layoutStore = useLayoutDashboardStore();
</script>

<style scoped>
</style>