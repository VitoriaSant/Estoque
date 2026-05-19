<template>
  <v-row no-gutters>
    <v-col cols="12" md="6" lg="3" class="pa-1">
      <Card
        title="Pedidos Pendentes"
        subtitle="Total de pedidos pendentes"
        icon="mdi-text-box-edit"
        :valor="props.dados?.resumo?.totalDePedidos"
        :loading="!props.dados"
      />
    </v-col>
    <v-col cols="12" md="6" lg="3" class="pa-1">
      <Card
        title="Valor Pendente"
        subtitle="Total de valores pendentes"
        icon="mdi-currency-usd"
        :valor="props.dados?.resumo?.somaTotal"
        :loading="!props.dados"
      />
    </v-col>
    <v-col cols="12" md="6" lg="3" class="pa-1">
      <Card
        title="Pedidos em Atraso"
        subtitle="Total de pedidos pendentes em atraso"
        icon="mdi-clock-alert"
        :valor="props.dados?.resumo?.qntPedidoEmAtraso"
        cor="error"
        :loading="!props.dados"
      />
    </v-col>
    <v-col cols="12" md="6" lg="3" class="pa-1">
      <Card
        title="Valor Pendente em Atraso"
        subtitle="Total de valores pendentes em atraso"
        icon="mdi-currency-usd"
        :valor="props.dados?.resumo?.somaPedidoEmAtraso"
        cor="error"
        :loading="!props.dados"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
const props = defineProps<{
  dados: any;
}>();
</script>
