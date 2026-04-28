<template>
<v-row no-gutters>
    <v-col class="pa-1">
    <v-card
        variant="elevated"
        class="mx-auto"
        title="Pedidos Pendentes"
        prepend-icon="mdi-archive-alert"
    >
        <Tabela 
            :th="['Codigo', 'Fornecedor', 'Prev. Entrega', 'Valor']" 
            :campos="['pedidoId', 'fornecedorNome', 'previsaoEntregaPedido', 'valorTotalPedido']"
            :campoKey="'pedidoId'"
            :dados="dados?.pedidosPendentes || []" 
        />
    </v-card>
    </v-col>
    <v-col class="pa-1">
    <v-card
        variant="elevated"
        class="mx-auto"
        title="Itens Pendentes"
        prepend-icon="mdi-archive-alert"
    >
        <Tabela
            :th="[
                'Código Item',
                'Descrição',
                'Quantidade',
                'Valor Unitário',
                'Valor Total',
            ]"
            :campos="['IdItem', 'descricaoItem', 'quantidadeItens', 'valorUnitarioItem', 'valorTotalItem']"
            :campoKey="'IdItem'"
            :dados="dados?.itensPendentes || []"
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
        console.log("Dados recebidos nos itens:", resultado);
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
