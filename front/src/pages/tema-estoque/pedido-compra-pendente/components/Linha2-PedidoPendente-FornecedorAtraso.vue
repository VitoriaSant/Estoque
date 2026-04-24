<template>
<v-row no-gutters>
    <v-col cols="4" class="pa-1">
    <v-card
        variant="elevated"
        class="mx-auto"
        title="Pedidos Pendentes"
        prepend-icon="mdi-text-box-edit"
    >
        <Pizza />
    </v-card>
    </v-col>
    <v-col cols="8" class="pa-1">
    <v-card
        variant="elevated"
        class="mx-auto"
        title="Fornecedor em atraso"
        prepend-icon="mdi-account-alert"
    >
        <Tabela 
    :th="['Codigo', 'Fornecedor', 'Qtd. Pedido', 'Valor']" 
    :campos="['CODIGO_PDC', 'RAZAOSOCIAL_PESSOA', 'QTDEABERTA_PDCITEMDET', 'VLRUNITARIOLIQUIDO_PDCITEMDET']"
    :campoKey="'CODIGO_PDC'"
    :dados="dados?.dados || []" 
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
