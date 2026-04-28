<template>
<v-row no-gutters>
    <v-col class="pa-1">
    <Card
        title="Pedidos Pendentes"
        subtitle="Total de pedidos pendentes"
        icon="mdi-text-box-edit"
        :valor=dados?.resumo?.totalDePedidos
    />
    </v-col>
    <v-col class="pa-1">
    <Card
        title="Valor Pendente"
        subtitle="Total de valor pendente"
        icon="mdi-currency-usd"
        :valor=dados?.resumo?.somaTotal
    />
    </v-col>
    <v-col class="pa-1">
    <Card
        title="Pedidos em Atraso"
        subtitle="Total de pedidos pendentes em atraso"
        icon="mdi-clock-alert"
        :valor=dados?.resumo?.qntPedidoEmAtraso
        cor="error"
    />
    </v-col>
    <v-col class="pa-1">
    <Card
        title="Valor Pendente em Atraso"
        subtitle="Total de valor pendente em atraso"
        icon="mdi-currency-usd"
        :valor=dados?.resumo?.somaPedidoEmAtraso
        cor="error"
    />
    </v-col>
</v-row>
</template> 

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useLayoutDashboardStore } from "@/stores/LayoutDashboardStore";


const layoutStore = useLayoutDashboardStore();
const dados = ref<any>(null);

const carregarDados = async () => {
    try {
        const resultado = await layoutStore.filtrarComprasPendentes();
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
