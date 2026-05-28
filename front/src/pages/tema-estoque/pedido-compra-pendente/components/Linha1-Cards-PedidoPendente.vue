<template>
  <v-row no-gutters>
    <v-col cols="12" md="6" lg="3" class="pa-1">
      <Card
        title="Pedidos Pendentes"
        subtitle="Total de pedidos pendentes"
        icon="mdi-text-box-edit"
        :valor="props.dadosResumo?.totalPedidosComSaldo || 0"
        :loading="!props.dadosResumo"
      />
    </v-col>
    <v-col cols="12" md="6" lg="3" class="pa-1">
      <Card
        title="Valor Pendente"
        subtitle="Total de valores pendentes"
        icon="mdi-currency-usd"
        :valor="props.dadosResumo?.valorTotal || 0"
        :loading="!props.dadosResumo"
      />
    </v-col>
    <v-col cols="12" md="6" lg="3" class="pa-1">
      <Card
        title="Pedidos em Atraso"
        subtitle="Total de pedidos pendentes em atraso"
        icon="mdi-clock-alert"
        :valor="props.dadosResumo?.totalPedidosAtrasados || 0"
        cor="error"
        :loading="!props.dadosResumo"
      />
    </v-col>
    <v-col cols="12" md="6" lg="3" class="pa-1">
      <Card
        title="Valor Pendente em Atraso"
        subtitle="Total de valores pendentes em atraso"
        icon="mdi-currency-usd"
        :valor="props.dadosResumo?.valorTotalAtrasado || 0"
        cor="error"
        :loading="!props.dadosResumo"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
//Classe
import CResumoPedidoCompraPendente from '@/service/tema-estoque/pedidos-compra-pendente/resumo-pedido-compra-pendente/CResumoPedidoCompraPendenteModel';

const props = defineProps<{
  dadosResumo: CResumoPedidoCompraPendente;
}>();
</script>

