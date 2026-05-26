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
          <Bolhas :expandido="expandido" :dataSet="dataSetBolha" />
        </template>
      </CardParaComportarGraf>
    </v-col>

    <v-col cols="12" md="4" class="pa-1">
      <CardParaComportarGraf
        :titulo="'Gráfico de Coluna, Linha e Área'"
        :icone="'mdi-chart-bar'"
        :dataSet="dataSetColunaLinhaArea"
      >
        <template #grafico="{ expandido }">
          <ColunaLinhaArea :expandido="expandido" :dataSet="dataSetColunaLinhaArea" />
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
import Bolhas from '@/components/graficos/bolha/Bolhas.vue';
import ColunaLinhaArea from '@/components/graficos/coluna-linha-area/ColunaLinhaArea.vue';
import CardParaComportarGraf from '@/components/CardParaComportarGraf.vue';

//Classes
import CDatasetGraficoMapaDeArea from '@/components/graficos/mapa-de-area/CDataSetGraficoMapaDeArea.ts';
import CDatasetGraficoColunaLinhaArea, {
  CGraficoColunaLinhaArea,
} from '@/components/graficos/coluna-linha-area/CDatasetGraficoColunaLinhaArea.ts';
import CDatasetGraficoBolha from '@/components/graficos/bolha/CDatasetGraficoBolha.ts';

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

type TRegistrosColunaLinhaArea = {
  titulo: string;
  tipo: string;
  valor: number[];
};

const dataSetColunaLinhaArea = computed(() => {
  const campos = new CGraficoColunaLinhaArea<TRegistrosColunaLinhaArea>({
    campoTitulo: 'titulo',
    campoTipo: 'tipo',
    campoValor: 'valor',
  });

  return new CDatasetGraficoColunaLinhaArea<TRegistrosColunaLinhaArea>({
    campos,
    campoLabel: [
      '01/01/2003',
      '02/01/2003',
      '03/01/2003',
      '04/01/2003',
      '05/01/2003',
      '06/01/2003',
      '07/01/2003',
      '08/01/2003',
      '09/01/2003',
      '10/01/2003',
      '11/01/2003',
    ],
    registros: [
      {
        titulo: 'TEMA 1',
        tipo: 'column',
        valor: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
      },
      {
        titulo: 'TEMA 2',
        tipo: 'area',
        valor: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
      },
      {
        titulo: 'TEMA 3',
        tipo: 'line',
        valor: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
      },
    ],
  });
});

type TRegistrosBolha = {
  titulo: string;
  valores: number[][];
};

const dataSetBolha = computed(() => {
  return new CDatasetGraficoBolha<TRegistrosBolha>({
    campoLabel: 'titulo',
    campoValor: 'valores',
    registros: [
      {
        titulo: 'PRODUTO A',
        valores: [
          [469, 42, 64],
          [373, 47, 50],
          [185, 34, 51],
          [316, 47, 19],
          [17, 53, 45],
          [81, 16, 36],
          [81, 20, 44],
          [664, 25, 55],
          [660, 35, 64],
          [245, 25, 55],
          [185, 34, 51],
          [316, 47, 19],
          [17, 53, 45],
          [81, 16, 36],
          [81, 20, 44],
          [664, 25, 55],
          [660, 35, 64],
          [245, 25, 55],
        ],
      },
      {
        titulo: 'PRODUTO B',
        valores: [
          [532, 14, 41],
          [336, 28, 42],
          [403, 51, 71],
          [634, 31, 59],
          [666, 31, 59],
          [64, 39, 22],
          [356, 17, 28],
          [104, 37, 47],
          [682, 18, 27],
          [243, 43, 46],
          [336, 28, 42],
          [403, 51, 71],
        ],
      },
    ],
  });
});
</script>
