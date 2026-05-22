<template>
  <v-row>
    <v-col cols="12" md="12" class="pa-1">
      <CardParaComportarGraf :titulo="'Consumo últimos 12 meses'" :icone="'mdi-text-box-search-outline'">
        <template #grafico="{ expandido }">
          <BarrasVertical :expandido="expandido" :dados="props.dados?.consumoUltimos12Meses || []" />
        </template>
      </CardParaComportarGraf>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
//Components
import BarrasVertical from '@/components/graficos/barra-vertical/BarrasVertical.vue';

const props = defineProps<{
  dados: any;
}>();
</script>
