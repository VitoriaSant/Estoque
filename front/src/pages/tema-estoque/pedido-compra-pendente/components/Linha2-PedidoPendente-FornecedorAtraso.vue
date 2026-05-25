<template>
  <v-row no-gutters>
    <v-col cols="12" md="4" class="pa-1">
      <CardParaComportarGraf :titulo="'Pedidos Pendentes'" :icon="'mdi-text-box-edit'">
        <template #grafico="{ expandido }">
          <Pizza :dataSet="dataSetPizza" :expandido="expandido" />
        </template>
      </CardParaComportarGraf>
    </v-col>
    <v-col cols="12" md="8" class="pa-1">
      <CardParaComportarGraf :titulo="'Fornecedor em atraso'" :icon="'mdi-account-alert'">
        <template #grafico="{ expandido }">
          <Tabela
            :th="['Codigo', 'Fornecedor', 'Qtd. Pedidos', 'Valor Total']"
            :campos="['fornecedorId', 'fornecedorNome', 'quantidadePedidosFornecedor', 'valorTotalFornecedor']"
            :campoKey="'fornecedorId'"
            :dados="props.dados?.pedidosPorFornecedor || []"
            :height="'350px'"
            :expandido="expandido"
          />
        </template>
      </CardParaComportarGraf>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
//Vue
import { computed } from 'vue';

//Classes
import CDatasetGraficoPizza from '@/components/graficos/pizza/CDatasetGraficoPizza';

const props = defineProps<{
  dados: any;
}>();

type TRegistroPizza = {
  titulo: string;
  valor: number[];
};

const dataSetPizza = computed(() => {
  return new CDatasetGraficoPizza<TRegistroPizza>({
    campoLabel: 'titulo',
    campoValor: 'valor',
    registros: [
      {
        titulo: 'Pedidos em Atraso',
        valor: props.dados?.resumo?.qntPedidoEmAtraso,
      },
      {
        titulo: 'Pedidos no Prazo',
        valor: props.dados?.resumo?.pedidoEmDia,
      },
    ],
  });
});
</script>
