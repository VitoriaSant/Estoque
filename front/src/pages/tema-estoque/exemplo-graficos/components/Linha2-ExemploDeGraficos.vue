<template>
  <v-row>
    <v-col cols="12" md="4" class="pa-1">
      <CardParaComportarGraf :titulo="'Gráfico de Donuts'" :icone="'mdi-chart-arc'">
        <template #grafico="{ expandido }">
          <Donuts :expandido="expandido" :dataSet="dataSetDonuts" />
        </template>
      </CardParaComportarGraf>
    </v-col>

    <v-col cols="12" md="4" class="pa-1">
      <CardParaComportarGraf :titulo="'Gráfico Polar'" :icone="'mdi-chart-pie-outline'">
        <template #grafico="{ expandido }">
          <AreaPolar :expandido="expandido" :dataSet="dataSetAreaPolar" />
        </template>
      </CardParaComportarGraf>
    </v-col>

    <v-col cols="12" md="4" class="pa-1">
      <CardParaComportarGraf :titulo="'Gráfico de Barras Vertical Empilhada'" :icone="'mdi-chart-waterfall'">
        <template #grafico="{ expandido }">
          <BarrasVerticalEmpilhada :expandido="expandido" :dataSet="dataSetBarraVerticalEmpilhada" />
        </template>
      </CardParaComportarGraf>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
// Vue
import { computed } from 'vue';

//Components
import Donuts from '@/components/graficos/donusts/Donuts.vue';
import AreaPolar from '@/components/graficos/area-polar/AreaPolar.vue';
import BarrasVerticalEmpilhada from '@/components/graficos/barra-vertical-empilhada/BarrasVerticalEmpilhada.vue';
import CardParaComportarGraf from '@/components/CardParaComportarGraf.vue';

//Classes
import CDatasetGraficoDonuts from '@/components/graficos/donusts/CDatasetGraficoDonuts.ts';
import CDatasetGraficoAreaPolar from '@/components/graficos/area-polar/CDatasetGraficoAreaPolar.ts';
import CDatasetGraficoBarraVerticalEmpilhada, {
  CGraficoBarraVerticalEmpilhada,
} from '@/components/graficos/barra-vertical-empilhada/CDatasetGraficoBarraVerticalempilhado';

type TRegistrosDonuts = {
  descricao: string;
  valor: number;
};

const dataSetDonuts = computed(() => {
  return new CDatasetGraficoDonuts<TRegistrosDonuts>({
    campoLabel: 'descricao',
    campoValor: 'valor',
    registros: [
      {
        descricao: 'PRODUTO A',
        valor: 44,
      },
      {
        descricao: 'PRODUTO B',
        valor: 55,
      },
      {
        descricao: 'PRODUTO C',
        valor: 13,
      },
      {
        descricao: 'PRODUTO D',
        valor: 43,
      },
    ],
  });
});

type TRegistrosAreaPolar = {
  descricao: string;
  valor: number;
};

const dataSetAreaPolar = computed(() => {
  return new CDatasetGraficoAreaPolar<TRegistrosAreaPolar>({
    campoLabel: 'descricao',
    campoValor: 'valor',
    registros: [
      {
        descricao: 'PRODUTO A',
        valor: 42,
      },
      {
        descricao: 'PRODUTO B',
        valor: 47,
      },
      {
        descricao: 'PRODUTO C',
        valor: 52,
      },
      {
        descricao: 'PRODUTO D',
        valor: 58,
      },
      {
        descricao: 'PRODUTO E',
        valor: 65,
      },
    ],
  });
});

type TRegistrosBarraVerticalEmpilhada = {
  titulo: string;
  valor: number[];
};

const dataSetBarraVerticalEmpilhada = computed(() => {
  new CGraficoBarraVerticalEmpilhada<TRegistrosBarraVerticalEmpilhada>({
    campoTitulo: 'titulo',
    campoValor: 'valor',
  });

  return new CDatasetGraficoBarraVerticalEmpilhada<TRegistrosBarraVerticalEmpilhada>({
    campoLabel: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    registros: [
      {
        titulo: 'PRODUTO A',
        valor: [44, 55, 41, 67, 22, 43],
      },
      {
        titulo: 'PRODUTO B',
        valor: [13, 23, 20, 8, 13, 27, 33, 12],
      },
      {
        titulo: 'PRODUTO C',
        valor: [11, 17, 15, 15, 21, 14, 15, 13],
      },
    ],
  });
});
</script>
