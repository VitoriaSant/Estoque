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
            :dados="responseFornecedor.registros || []"
            :height="'350px'"
            :expandido="expandido"
            :totalDeRegistros="responseFornecedor.paginacao.totalDeRegistros || 0"
            v-model:pagina="responseFornecedor.paginacao.pagina"
            v-model:limite="responseFornecedor.paginacao.limite"
          />
        </template>
      </CardParaComportarGraf>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
//Vue
import { computed } from 'vue';

//componente
import Pizza from '@/components/graficos/pizza/Pizza.vue';
import CDatasetGraficoPizza from '@/components/graficos/pizza/CDatasetGraficoPizza';

//Classes
import CFornecedoresPedidoCompraPendente from '@/service/tema-estoque/pedidos-compra-pendente/fornecedores-pedido-compra-pendente/CFornecedoresPedidoCompraPendenteModel';
import CResumoPedidoCompraPendente from '@/service/tema-estoque/pedidos-compra-pendente/resumo-pedido-compra-pendente/CResumoPedidoCompraPendenteModel';
import CResponseConsultaPaginada from '@/service/base/CResponseConsultaPaginada.ts';

const props = defineProps<{
  dadosResumo: CResumoPedidoCompraPendente | null;
}>();

const responseFornecedor = defineModel<CResponseConsultaPaginada<CFornecedoresPedidoCompraPendente>>(
  'responseFornecedor',
  {
    required: true,
  },
);

type TRegistroPizza = {
  titulo: string;
  valor: number;
};

const valorPendenteNoPrazo =
  (props.dadosResumo?.totalPedidosComSaldo ?? 0) - (props.dadosResumo?.totalPedidosAtrasados ?? 0);

const dataSetPizza = computed(() => {
  return new CDatasetGraficoPizza<TRegistroPizza>({
    campoLabel: 'titulo',
    campoValor: 'valor',
    registros: [
      {
        titulo: 'Pedidos em Atraso',
        valor: props.dadosResumo?.totalPedidosAtrasados || 0,
      },
      {
        titulo: 'Pedidos Pendentes',
        valor: valorPendenteNoPrazo,
      },
    ],
  });
});
</script>
