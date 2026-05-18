<template>
<v-row>
    <v-col cols="12" md="12" class="pa-1">
        <CardParaComportarGraf 
            :titulo="'Ponto de Compra'"
            :icone="'mdi-cash-multiple'"
            >
                <template #grafico="{ expandido }">
                    <Tabela
                        :th="['Cod. Item', 'Descrição', 'Saldo Disponível', 'Saldo Mínimo', 'Saldo Máximo', 'Pedido de Compra Pendente', 'Prazo de Entrega', 'Consumo Diário', 'Dias de Duração']" 
                        :campos="['itemId', 'descricaoItem', 'saldoDisponivel', 'saldoMinimo', 'saldoMaximo', 'pedidoCompraPendente', 'prazoEntrega', 'consumoDiario', 'diasDeDuracao']"
                        :campoKey="'itemId'"
                        :dados="dados?.pontoDeCompra" 
                        :height="'700px'"
                        :itensPorPagina="20"
                        :corDeAlerta="'corDeAlerta'"
                        :expandido="expandido"
                    />
                </template>
        </CardParaComportarGraf>
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