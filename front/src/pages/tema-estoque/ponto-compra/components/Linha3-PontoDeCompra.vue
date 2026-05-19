<template>
  <v-row>
    <v-col cols="12" md="12" class="pa-1">
      <CardParaComportarGraf :titulo="'Ponto de Compra'" :icone="'mdi-cash-multiple'">
        <template #grafico="{ expandido }">
          <Tabela
            :th="[
              'Cod. Item',
              'Descrição',
              'Saldo Disponível',
              'Saldo Mínimo',
              'Saldo Máximo',
              'Pedido de Compra Pendente',
              'Prazo de Entrega',
              'Consumo Diário',
              'Dias de Duração',
            ]"
            :campos="[
              'itemId',
              'descricaoItem',
              'saldoDisponivel',
              'saldoMinimo',
              'saldoMaximo',
              'pedidoCompraPendente',
              'prazoEntrega',
              'consumoDiario',
              'diasDeDuracao',
            ]"
            :campoKey="'itemId'"
            :dados="props.dados?.pontoDeCompra"
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
const props = defineProps<{
  dados: any;
}>();
</script>

<style scoped></style>
