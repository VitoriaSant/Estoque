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
      categories: lLabels.value,
    },
  };

  return lOptions;
});

const lDados = computed(() => {
  return props.dataSet.registros.map((registro) => registro[props.dataSet.campoValor]);
});

const lLabels = computed(() => {
  return props.dataSet.registros.map((registro) => registro[props.dataSet.campoLabel]);
});

const series = computed(() => {
  return [
    {
      data: lDados.value,
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
