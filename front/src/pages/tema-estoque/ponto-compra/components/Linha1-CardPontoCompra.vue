<template>
<v-row>
    <v-col cols="12" md="4" class="pa-1">
        <Card
        title="Estoque em valor"
        subtitle="Valor total do estoque"
        icon="mdi-text-box-edit"
        :valor=dados?.resumo?.valorTotalEmEstoque
        />
    </v-col>
    <v-col cols="12" md="4" class="pa-1">
        <Card
        title="Pedido pendente em valor"
        subtitle="Valor total dos pedidos pendentes"
        icon="mdi-text-box-edit"
        :valor=dados?.resumo?.valorTotalDePedidosPendentes
        cor="error"
        />
    </v-col>
    <v-col cols="12" md="4" class="pa-1">
        <Card
        title="Saldo em futuros"
        subtitle="Soma do estoque e saldo em futuros"
        icon="mdi-text-box-edit"
        :valor=dados?.resumo?.valorTotal
        />
    </v-col>
</v-row>
</template>

<script setup lang="ts">
import { useLayoutDashboardStore } from '@/stores/LayoutDashboardStore';
import { ref, onMounted, watch } from 'vue';

const layoutStore = useLayoutDashboardStore();
const dados = ref<any>(null);

const carregarDados = async () => {
    try {
        const resultado = await layoutStore.filtrarPontoDeCompra();
        dados.value = resultado;
        console.log("Dados recebidos nos cards:", resultado);
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
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