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
    <Informativo 
    :dialogInfo="infoStore.exibirInformativo"
    @fechar="infoStore.exibirInformativo = false"
    :titulo="'💡 Informativo'"
    :subtitulo="''"
    style="white-space: pre-line;"
    :descricao="`Para facilitar o seu controle de estoque, as linhas da tabela mudam de cor automaticamente conforme o saldo:\n
        🔴 Vermelho: Atenção crítica! O saldo atual está abaixo do saldo mínimo. É hora de repor.\n
        🟡 Amarelo: Alerta de estoque baixo. O saldo atual está abaixo da metade do saldo máximo.\n
        Ponto de compra: \n
        📅 Prazo de Entrega: Indica o tempo restante para o recebimento do próximo pedido. O sistema calcula a diferença entre a data atual e a previsão de entrega, informando com precisão quantos dias faltam para o material chegar ao estoque.\n
        📊 Consumo Diário: Representa a força de saída do item. É obtido através da média aritmética de todas as requisições atendidas nos últimos 90 dias, oferecendo uma visão realista da demanda atual.\n
        ⏳ Dias de Duração: Projeta a autonomia do seu estoque. Este indicador revela para quantos dias o saldo atual é suficiente, cruzando a quantidade disponível com o ritmo de consumo dos últimos três meses.`"
    />
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