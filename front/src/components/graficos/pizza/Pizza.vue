<template>
  <div class="chart-container" :class="{ fullscreen: expandido }">
    <apexchart height="100%" id="pizza-chart" type="donut" :options="options" :series="series" />
  </div>
</template>

<script lang="ts" setup>
//Vue
import { computed } from 'vue';

//ApexCharts
import VueApexCharts from 'vue3-apexcharts';
import type { ApexOptions } from 'apexcharts';

//Classes
import CDatasetGraficoPizza from './CDatasetGraficoPizza';

const apexchart = VueApexCharts;

const props = defineProps<{
  dataSet: CDatasetGraficoPizza<any>;
  expandido?: boolean;
}>();

const options = computed<ApexOptions>(() => {
  const lOptions: ApexOptions = {
    chart: {
      id: 'vuechart-example',
    },
    colors: ['#a55050', '#755640'],
    plotOptions: {
      pie: {
        donut: {
          size: '0%',
        },
      },
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      floating: false,
      fontSize: '12px',
      offsetY: 10,
    },
    labels: lLabels,
  };
  return lOptions;
});

const lLabels = [] as any[];
for (const registro of props.dataSet.registros) {
  lLabels.push(registro[props.dataSet.campoLabel]);
}

const lDados = [] as any[];
for (const registro of props.dataSet.registros) {
  lDados.push(registro[props.dataSet.campoValor]);
}

const series = computed(() => {
  return lDados;
});
</script>
<style scoped>
#pizza-chart {
  display: flex;
  justify-content: center;
  align-items: center;
}

.chart-container {
  width: 100%;
  height: 300px;
}

.chart-container.fullscreen {
  height: 100%;
}
</style>
