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
  {{ dataSetMapaDeArea }}
  </br>
  {{ dataSetColunaLinhaArea }}
  </br>
  {{ dataSetBolha }}
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

// 1. Defina o tipo de cada bolha interna (Atenção ao Z maiúsculo do seu JSON)
type TItemPonto = {
  x: number;
  y: number;
  Z: number;
};

// 2. Defina o tipo do registro pai (que contém o array de bolhas)
type TProdutoRegistro = {
  titulo: string;
  valores: TItemPonto[];
};

const dataSetBolha = computed(() => {
  // Passamos os dois tipos para a classe garantir a validação completa
  return new CDatasetGraficoBolha<TProdutoRegistro, TItemPonto>({
    campoLabel: 'titulo',
    campoValor: 'valores', // Nome da propriedade que guarda o array
    campoX: 'x',
    campoY: 'y',
    campoTamanhoBolha: 'Z', // Mapeando para o seu 'Z' maiúsculo
    registros: [
      {
        titulo: 'Prod. A',
        valores: [
          {
            x: 469,
            y: 42,
            Z: 64,
          },
          {
            x: 373,
            y: 47,
            Z: 50,
          },

          {
            x: 185,
            y: 34,
            Z: 51,
          },
          {
            x: 316,
            y: 47,
            Z: 19,
          },
          {
            x: 17,
            y: 53,
            Z: 45,
          },
          {
            x: 81,
            y: 16,
            Z: 36,
          },
          {
            x: 81,
            y: 20,
            Z: 44,
          },
          {
            x: 664,
            y: 25,
            Z: 55,
          },
          {
            x: 660,
            y: 35,
            Z: 64,
          },
          {
            x: 245,
            y: 25,
            Z: 55,
          },
        ],
      },
      {
        titulo: 'Prod. B',
        valores: [
          {
            x: 532,
            y: 14,
            Z: 41,
          },
          {
            x: 336,
            y: 28,
            Z: 42,
          },
          {
            x: 403,
            y: 51,
            Z: 71,
          },
          {
            x: 634,
            y: 31,
            Z: 59,
          },
          {
            x: 666,
            y: 31,
            Z: 59,
          },
          {
            x: 64,
            y: 39,
            Z: 22,
          },
          {
            x: 356,
            y: 17,
            Z: 28,
          },
          {
            x: 104,
            y: 37,
            Z: 47,
          },
          {
            x: 682,
            y: 18,
            Z: 27,
          },
          {
            x: 243,
            y: 43,
            Z: 46,
          },
        ],
      },
    ],
  });
});
</script>
