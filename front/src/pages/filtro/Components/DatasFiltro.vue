<template>
  <v-row class="mb-2" no-gutters>
    <v-col cols="12" md="6" class="pa-1">
      <v-text-field v-model="dataInicio" label="Data início" type="date" variant="outlined" />
    </v-col>

    <v-col cols="12" md="6" class="pa-1">
      <v-text-field v-model="dataFim" label="Data fim" type="date" variant="outlined" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
//Vue
import { ref, watch } from 'vue';

//Services
import CClasseFiltro from '@/service/base/CClasseFiltro';
import CPedidoCompraPendenteModel from '@/service/tema-estoque/pedidos-compra-pendente/CPedidoCompraPendenteGeralModel';

const emit = defineEmits<{
  'update:dataInicio': [value: string];
  'update:dataFim': [value: string];
}>();

const props = defineProps<{
  classeFiltro: CClasseFiltro<CPedidoCompraPendenteModel>;
  dialogFiltro: boolean;
}>();

//Necessario para que apareca nos inputs
const formatarDataParaInput = (data: Date) => {
  return data.toISOString().split('T')[0];
};
const dataInicio = ref(props.classeFiltro.dataInicio ? formatarDataParaInput(props.classeFiltro.dataInicio) : '');
const dataFim = ref(props.classeFiltro.dataFim ? formatarDataParaInput(props.classeFiltro.dataFim) : '');

watch(dataInicio, (newValue) => {
  if (newValue) {
    emit('update:dataInicio', newValue as string);
  }
});

watch(dataFim, (newValue) => {
  if (newValue) {
    emit('update:dataFim', newValue as string);
  }
});
</script>

<style scoped></style>
