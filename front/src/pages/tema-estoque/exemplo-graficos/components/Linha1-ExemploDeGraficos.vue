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
          <BarrasVertical :expandido="expandido" :dataSet="dataSetBarraVertical" />
        </template>
      </CardParaComportarGraf>
    </v-col>

    <v-col cols="12" md="4" class="pa-1">
      <CardParaComportarGraf :titulo="'Gráfico de Linhas'" :icone="'mdi-chart-line'">
        <template #grafico="{ expandido }">
          <Linhas :expandido="expandido" :dataSet="dataSetLinha" />
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
import BarrasVertical from '@/components/graficos/barra-vertical/BarrasVertical.vue';
import Linhas from '@/components/graficos/linha/Linhas.vue';
import CardParaComportarGraf from '@/components/CardParaComportarGraf.vue';

//Classes
import CDatasetGraficoBarraHorizontal from '@/components/graficos/barra-horizontal/CDatasetGraficoBarraHorizontal.ts';
import CDatasetGraficoBarraVertical from '@/components/graficos/barra-vertical/CDatasetGraficoBarraVertical.ts';
import CDatasetGraficoLinha, { CGraficoLinha } from '@/components/graficos/linha/CDatasetGraficoLinha.ts';

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
      {
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

type TRegistrosBarraVertical = {
  ano: number;
  valor: number;
};
const dataSetBarraVertical = computed(() => {
  return new CDatasetGraficoBarraVertical<TRegistrosBarraVertical>({
    campoLabel: 'ano',
    campoValor: 'valor',
    registros: [
      {
        ano: 1991,
        valor: 30,
      },
      {
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

type TRegistrosLinha = {
  titulo: string;
  valor: number[];
};
const dataSetLinha = computed(() => {
  const campos = new CGraficoLinha<TRegistrosLinha>({
    campoTitulo: 'titulo',
    campoValor: 'valor',
  });

  return new CDatasetGraficoLinha<TRegistrosLinha>({
    campos: campos,
    campoLabel: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    registros: [
      {
        titulo: 'PRODUTO A',
        valor: [30, 40, 45, 50, 49, 60, 70, 91],
      },
      {
        titulo: 'PRODUTO B',
        valor: [20, 30, 35, 40, 39, 50, 60, 81],
      },
      {
        titulo: 'PRODUTO C',
        valor: [10, 20, 25, 30, 29, 40, 50, 71],
      },
    ],
  });
});
</script>
