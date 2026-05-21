<template>
  <v-row no-gutters>
    <v-col cols="12" md="4" class="pa-1">
      <CardParaComportarGraf :titulo="'Pedidos Pendentes'" :icon="'mdi-text-box-edit'">
        <template #grafico="{ expandido }">
          <Pizza
            :options="['Pedidos em Atraso', 'Pedidos no Prazo']"
            :dados="[props.dados?.resumo?.qntPedidoEmAtraso || 0, props.dados?.resumo?.pedidoEmDia || 0]"
            :expandido="expandido"
          />
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
const props = defineProps<{
  dados: any;
}>();
</script>
