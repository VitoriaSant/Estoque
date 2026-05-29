<template>
  <v-row no-gutters>
    <v-col cols="12" md="6" lg="3" class="pa-1">
      <Card
        title="Pedidos Pendentes"
        subtitle="Total de pedidos pendentes"
        icon="mdi-text-box-edit"
        :valor="responseResumo.registros[0]?.totalPedidosComSaldo || 0"
        :loading="!responseResumo"
      />
    </v-col>
    <v-col cols="12" md="6" lg="3" class="pa-1">
      <Card
        title="Valor Pendente"
        subtitle="Total de valores pendentes"
        icon="mdi-currency-usd"
        :valor="valorTotal"
        :loading="!responseResumo"
      />
    </v-col>
    <v-col cols="12" md="6" lg="3" class="pa-1">
      <Card
        title="Pedidos em Atraso"
        subtitle="Total de pedidos pendentes em atraso"
        icon="mdi-clock-alert"
        :valor="responseResumo.registros[0]?.totalPedidosAtrasados || 0"
        cor="error"
        :loading="!responseResumo"
      />
    </v-col>
    <v-col cols="12" md="6" lg="3" class="pa-1">
      <Card
        title="Valor Pendente em Atraso"
        subtitle="Total de valores pendentes em atraso"
        icon="mdi-currency-usd"
        :valor="valorTotalAtrasadoFormatado"
        cor="error"
        :loading="!responseResumo"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
//Vue
import { computed } from 'vue';

//Classe
import CResumoPedidoCompraPendente from '@/service/tema-estoque/pedidos-compra-pendente/resumo-pedido-compra-pendente/CResumoPedidoCompraPendenteModel';
import CResponseConsulta from '@/service/base/CResponseConsulta.ts';

//Utils
import formatterUtils from '@/utils/FormatterUtils';

const responseResumo = defineModel<CResponseConsulta<CResumoPedidoCompraPendente>>('responseResumo', {
  required: true,
});

const valorTotalAtrasadoFormatado = computed(() => {
  return formatterUtils.formatarValor(responseResumo.value.registros[0]?.valorTotalAtrasado, 'moeda');
});

const valorTotal = computed(() => {
  return formatterUtils.formatarValor(responseResumo.value.registros[0]?.valorTotal, 'moeda');
});
</script>
