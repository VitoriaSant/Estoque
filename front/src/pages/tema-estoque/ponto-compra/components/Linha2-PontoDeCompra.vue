<template>
<v-row>
    <v-col cols="12" md="12" class="pa-1">
    <v-card
        variant="elevated"
        class="mx-auto"
        title="Ponto de Compra"
        prepend-icon="mdi-cash-multiple"
    >
        <template v-slot:append>
            <v-btn variant="text" icon="mdi-information-outline" @click="infoStore.mostrarInformacoes()"></v-btn>
        </template>

        <Informativo 
        :dialogInfo="infoStore.exibirInformativo"
        @fechar="infoStore.exibirInformativo = false"
        :titulo="'💡 Entenda as Cores da Tabela'"
        :subtitulo="'Para facilitar o seu controle de estoque, as linhas da tabela mudam de cor automaticamente conforme o saldo:'"
        style="white-space: pre-line;"
        :descricao="`🔴 Vermelho: Atenção crítica! O saldo atual está abaixo do saldo mínimo. É hora de repor.\n🟡 Amarelo: Alerta de estoque baixo. O saldo atual está abaixo da metade do saldo máximo.`"
        />
        
        <Tabela
            :th="['Cod. Item', 'Descrição', 'Saldo Disponível', 'Saldo Mínimo', 'Saldo Máximo', 'Pedido de Compra Pendente', 'Prazo de Entrega', 'Consumo Diário', 'Dias de Duração']" 
            :campos="['itemId', 'descricaoItem', 'saldoDisponivel', 'saldoMinimo', 'saldoMaximo', 'pedidoCompraPendente', 'prazoEntrega', 'consumoDiario', 'diasDeDuracao']"
            :campoKey="'itemId'"
            :dados="dados?.pontoDeCompra" 
            :height="'700px'"
            :itensPorPagina="20"
            :corDeAlerta="'corDeAlerta'"
        />
    </v-card>
    </v-col>
</v-row>
</template>

<script setup lang="ts">
import { useLayoutDashboardStore } from '@/stores/LayoutDashboardStore';
import { useInformativosStore } from '@/stores/InformativosStore';
import { ref, onMounted, watch } from 'vue';
import Informativo from '@/components/Informativo.vue';

const layoutStore = useLayoutDashboardStore();
const infoStore = useInformativosStore();
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