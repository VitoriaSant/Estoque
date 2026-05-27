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
            :campos="['fornecedorPdc', 'razaoSocialPessoa', 'totalPedidosComSaldoPendente', 'valorTotalPendente']"
            :campoKey="'fornecedorPdc'"
            :dados="props.dadosFornecedor || []"
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
import CFornecedoresPedidoCompraPendente from '@/Service/tema-estoque/pedidos-compra-pendente/fornecedores-pedido-compra-pendente/CFornecedoresPedidoCompraPendenteModel';
import CResumoPedidoCompraPendente from '@/Service/tema-estoque/pedidos-compra-pendente/resumo-pedido-compra-pendente/CResumoPedidoCompraPendenteModel';

const props = defineProps<{
  dadosFornecedor: CFornecedoresPedidoCompraPendente[];
  dadosResumo: CResumoPedidoCompraPendente | null;
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
        valor: [props.dadosResumo?.totalPedidosAtrasados || 0],
      },
      {
        titulo: 'Pedidos no Prazo',
        valor: [props.dadosResumo?.totalPedidosComSaldo || 0],
      },
    ],
  });
});
</script>
