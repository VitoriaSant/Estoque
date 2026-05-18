<template>
<v-row no-gutters>
    <v-col cols="12" md="7" class="pa-1">
        <CardParaComportarGraf 
            :titulo="'Itens Pendentes'"
            :icone="'mdi-archive-alert'"
            >
                <template #grafico="{ expandido }">
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
                        :expandido="expandido"
                    />
                </template>
        </CardParaComportarGraf>
    </v-col>
    <v-col cols="12" md="5" class="pa-1">

        <CardParaComportarGraf 
            :titulo="'Pedidos Pendentes'"
            :icone="'mdi-archive-alert'"
            >
                <template #grafico="{ expandido }">
                    <Tabela 
                        :th="['Codigo', 'Prev. Entrega', 'Valor']" 
                        :campos="['pedidoId', 'previsaoEntregaPedido', 'valorTotalPedido']"
                        :campoKey="'pedidoId'"
                        :dados="dados?.pedidosPendentes || []" 
                        :height="'350px'"
                        :expandido="expandido"
                    />
                </template>
        </CardParaComportarGraf>
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
