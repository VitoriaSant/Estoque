<template>
  <div class="chart-container" :class="{ fullscreen: expandido }">
    <apexchart width="100%" height="100%" type="bar" :options="options" :series="series" />
  </div>
</template>

<script setup lang="ts">
//Vue
import { computed } from 'vue';

//ApexCharts
import type { ApexOptions } from 'apexcharts';
import VueApexCharts from 'vue3-apexcharts';

//Classes
import CDatasetGraficoBarraHorizontal from './CDatasetGraficoBarraHorizontal';

const props = defineProps<{
  expandido?: boolean;
  dataSet: CDatasetGraficoBarraHorizontal<any>;
}>();

const apexchart = VueApexCharts;

const options = computed<ApexOptions>(() => {
  const lOptions: ApexOptions = {
    chart: {
      id: 'vuechart-example',
    },
    colors: ['#755640'],
    xaxis: {
      categories: lLabels,
    },
  };

  return lOptions;
});

const lDados = [] as any[];
for (const registro of props.dataSet.registros) {
  lDados.push(registro[props.dataSet.campoValor]);
}

const lLabels = [] as any[];
for (const registro of props.dataSet.registros) {
  lLabels.push(registro[props.dataSet.campoLabel]);
}

// const lDados = computed(() => {
//   return props.dataSet.registros.map((registro) => registro[props.dataSet.campoValor]);
// });

// const lLabels = computed(() => {
//   return props.dataSet.registros.map((registro) => registro[props.dataSet.campoLabel]);
// });

const series = computed(() => {
  return [
    {
      data: lDados,
    },
  ];
});

//type TRegistros = {
//  mes: string;
//  ano: number;
//  total: number;
//};

//const dataset = new CDatasetGraficoBarraHorizontal<TRegistros>();

//dataset.campoLabel = 'mes'
//dataset.campoValor = 'total'

//dataset.registros.push({
//  mes: 'Janeiro',
//  ano: 2024,
//  total: 100,
//});

// const lDados = [];
// for (const registro of dataSet.registros) {
//   lDados.push(registro[dataSet.campoValor]);
// }

// const lLabels = [];
// for (const registro of dataSet.registros) {
//   lLabels.push(registro[dataSet.campoLabel]);
// }
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 300px;
}

.chart-container.fullscreen {
  height: 100%;
}
</style>
