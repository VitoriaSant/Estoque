<template>
    <div>
        <Linha1-CardPontoCompra :dados="dados" />
        <Linha2-CosumoUltimos12meses :dados="dados" />
        <Linha3-PontoDeCompra :dados="dados" />
    </div>
</template>

<script setup lang="ts">
import { useLayoutDashboardStore } from "@/stores/LayoutDashboardStore";
import Linha1CardPontoCompra from './components/Linha1-CardPontoCompra.vue';
import Linha2CosumoUltimos12meses from './components/Linha2-CosumoUltimos12meses.vue';
import Linha3PontoDeCompra from './components/Linha3-PontoDeCompra.vue';
import { ref, onMounted, watch } from 'vue';

const layoutStore = useLayoutDashboardStore();

const dados = ref<any>(null);

const carregarDados = async () => {
    try {
        const resultado = await layoutStore.filtrarPontoDeCompra();
        dados.value = resultado;
        console.log("Dados recebidos nos cards:", resultado);
    } catch (error: any) {
        console.error("Erro ao carregar dados:", error?.message);
    }
};

watch(() => layoutStore.classeFiltro, () => {
    carregarDados();
}, { deep: true });

onMounted(() => {
    carregarDados();
});
</script>

<style scoped>
</style>