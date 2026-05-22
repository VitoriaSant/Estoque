<template>
  <v-row>
    <v-col cols="12" md="4" class="pa-1">
      <CardParaComportarGraf :titulo="'Gráfico de Barras Horizontal'" :icone="'mdi-chart-bar'">
        <template #grafico="{ expandido }">
          <BarrasHorizontal :expandido="expandido" :dataSet="dataSetBarraHorizontal" />
        </template>
      </CardParaComportarGraf>
    </v-col>

    <v-col cols="12" md="4" class="pa-1">
      <CardParaComportarGraf :titulo="'Gráfico de Barras Vertical'" :icone="'mdi-chart-bar'">
        <template #grafico="{ expandido }">
          <BarrasVertical :expandido="expandido" />
        </template>
      </CardParaComportarGraf>
    </v-col>

    <v-col cols="12" md="4" class="pa-1">
      <CardParaComportarGraf :titulo="'Gráfico de Linhas'" :icone="'mdi-chart-line'">
        <template #grafico="{ expandido }">
          <Linhas :expandido="expandido" />
        </template>
      </CardParaComportarGraf>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
// Vue
import { computed } from 'vue';

//Components
import BarrasHorizontal from '@/components/graficos/barra-horizontal/BarrasHorizontal.vue';
import BarrasVertical from '@/components/BarrasVertical.vue';
import Linhas from '@/components/Linhas.vue';
import CardParaComportarGraf from '@/components/CardParaComportarGraf.vue';

//Classes
import CDatasetGraficoBarraHorizontal from '@/components/graficos/barra-horizontal/CDatasetGraficoBarraHorizontal.ts';

type TRegistrosBarraHorizontal = {
  ano: number;
  valor: number;
};

const dataSetBarraHorizontal = computed(() => {
  return new CDatasetGraficoBarraHorizontal<TRegistrosBarraHorizontal>({
    campoLabel: 'ano',
    campoValor: 'valor',
    registros: [
      {
        ano: 1991,
        valor: 30,
      },
      {//
        ano: 1992,
        valor: 40,
      },
      {
        ano: 1993,
        valor: 45,
      },
      {
        ano: 1994,
        valor: 50,
      },
      {
        ano: 1995,
        valor: 49,
      },
      {
        ano: 1996,
        valor: 60,
      },
      {
        ano: 1997,
        valor: 70,
      },
      {
        ano: 1998,
        valor: 90,
      },
    ],
  });
});
</script>
