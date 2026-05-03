<template>
<v-row no-gutters>
    <v-col cols="12" md="4" class="pa-1">
    <v-card
        style="height: 476px"
        variant="elevated"
        class="mx-auto"
        title="Pedidos Pendentes"
        prepend-icon="mdi-text-box-edit"
    >
        <Pizza 
            :options="['Pedidos em Atraso', 'Pedidos no Prazo']"
            :dados="[dados?.resumo?.qntPedidoEmAtraso || 0, dados?.resumo?.pedidoEmDia || 0]"
        />
    </v-card>
    </v-col>
    <v-col cols="12" md="8" class="pa-1">
    <v-card
        variant="elevated"
        class="mx-auto"
        title="Fornecedor em atraso"
        prepend-icon="mdi-account-alert"
    >
        <Tabela 
            :th="['Codigo', 'Fornecedor', 'Qtd. Pedidos', 'Valor Total']" 
            :campos="['fornecedorId', 'fornecedorNome', 'quantidadePedidosFornecedor', 'valorTotalFornecedor']"
            :campoKey="'fornecedorId'"
            :dados="dados?.pedidosPorFornecedor || []" 
        />
    </v-card>
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
