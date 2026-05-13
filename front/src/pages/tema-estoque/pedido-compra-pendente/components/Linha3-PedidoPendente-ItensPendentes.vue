<template>
<v-row no-gutters>
    <v-col cols="12" md="7" class="pa-1">
        <v-card
        variant="elevated"
        class="mx-auto"
        title="Itens Pendentes"
        prepend-icon="mdi-archive-alert"
    >
        <Tabela
            :th="[
                'Código',
                'Descrição',
                'Quantidade',
                'Valor Unitário',
                'Valor Total',
            ]"
            :campos="['IdItem', 'descricaoItem', 'quantidadeItens', 'valorUnitarioItem', 'valorTotalItem']"
            :campoKey="'IdItem'"
            :dados="dados?.itensPendentes || []"
            :height="'350px'"
            :corDeAlerta="'corDeAlerta'"
        />
    </v-card>
    </v-col>
    <v-col cols="12" md="5" class="pa-1">
        <v-card
            variant="elevated"
            class="mx-auto"
            title="Pedidos Pendentes"
            prepend-icon="mdi-archive-alert"
        >
        <template v-slot:append>
            <v-btn variant="text" icon="mdi-information-outline" @click="infoStore.mostrarInformacoes()"></v-btn>
        </template>
        <Informativo 
        :dialogInfo="infoStore.exibirInformativo"
        @fechar="infoStore.exibirInformativo = false"
        :titulo="'💡 Entenda as Cores da Tabela'"
        :subtitulo="'Para facilitar a vizualização, as linhas da tabela mudam de cor automaticamente:'"
        style="white-space: pre-line;"
        :descricao="`🔴  Vermelho: Pedidos com a previsão de entrega menos que o dia atual`"
        />
            <Tabela 
                :th="['Codigo', 'Prev. Entrega', 'Valor']" 
                :campos="['pedidoId', 'previsaoEntregaPedido', 'valorTotalPedido']"
                :campoKey="'pedidoId'"
                :dados="dados?.pedidosPendentes || []" 
                :height="'350px'"
            />
        </v-card>
    </v-col>
</v-row>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useLayoutDashboardStore } from "@/stores/LayoutDashboardStore";
import { useInformativosStore} from '@/stores/InformativosStore';
import Informativo from "@/components/Informativo.vue";
import { use } from 'apexcharts';

const layoutStore = useLayoutDashboardStore();
const infoStore = useInformativosStore();
const dados = ref<any>(null);

const carregarDados = async () => {
    try {
        const resultado = await layoutStore.filtrarComprasPendentes();
        dados.value = resultado;
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
