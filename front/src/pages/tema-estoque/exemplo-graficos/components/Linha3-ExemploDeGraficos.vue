<template>
  <v-row>
    <v-col cols="12" md="4" class="pa-1">
      <CardParaComportarGraf :titulo="'Gráfico de Mapa de Área'" :icone="'mdi-chart-histogram'">
        <template #grafico="{ expandido }">
          <MapaDeArea :expandido="expandido" :dataSet="dataSetMapaDeArea" />
        </template>
      </CardParaComportarGraf>
    </v-col>

    <v-col cols="12" md="4" class="pa-1">
      <CardParaComportarGraf :titulo="'Gráfico de Bolhas'" :icone="'mdi-chart-scatter-plot-hexbin'">
        <template #grafico="{ expandido }">
          <Bolhas :expandido="expandido" />
        </template>
      </CardParaComportarGraf>
    </v-col>

    <v-col cols="12" md="4" class="pa-1">
      <CardParaComportarGraf :titulo="'Gráfico de Coluna, Linha e Área'" :icone="'mdi-chart-bar'">
        <template #grafico="{ expandido }">
          <ColunaLinhaArea :expandido="expandido" />
        </template>
      </CardParaComportarGraf>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
// Vue
import { computed } from 'vue';

//Components
import MapaDeArea from '@/components/graficos/mapa-de-area/MapaDeArea.vue';
import Bolhas from '@/components/Bolhas.vue';
import ColunaLinhaArea from '@/components/ColunaLinhaArea.vue';
import CardParaComportarGraf from '@/components/CardParaComportarGraf.vue';

//Classes
import CDatasetGraficoMapaDeArea from '@/components/graficos/mapa-de-area/CDataSetGraficoMapaDeArea.ts';

type TRegistrosMapaDeArea = {
  titulo: string;
  valor: number;
};

const dataSetMapaDeArea = computed(() => {
  return new CDatasetGraficoMapaDeArea<TRegistrosMapaDeArea>({
    campoTitulo: 'titulo',
    campoValor: 'valor',
    registros: [
      {
        titulo: 'PRODUTO A',
        valor: 218,
      },
      {
        titulo: 'PRODUTO B',
        valor: 149,
      },
      {
        titulo: 'PRODUTO C',
        valor: 184,
      },
      {
        titulo: 'PRODUTO D',
        valor: 55,
      },
      {
        titulo: 'PRODUTO E',
        valor: 84,
      },
      {
        titulo: 'PRODUTO F',
        valor: 31,
      },
      {
        titulo: 'PRODUTO G',
        valor: 70,
      },
    ],
  });
});
</script>
