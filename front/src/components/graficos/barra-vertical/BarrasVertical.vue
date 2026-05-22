<template>
  <div class="chart-container" :class="{ fullscreen: expandido }">
    <apexchart width="100%" height="100%" type="bar" :options="options" :series="series" />
  </div>
</template>

<script setup lang="ts">
//Vue
import { computed } from 'vue';

//ApexCharts
import VueApexCharts from 'vue3-apexcharts';
import type { ApexOptions } from 'apexcharts';

//Classes
import CDatasetGraficoBarraVertical from './CDatasetGraficoBarraVertical';

const props = defineProps<{
  expandido?: boolean;
  dataSet: CDatasetGraficoBarraVertical<any>;
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

const series = computed(() => [
  {
    data: lDados,
  },
]);
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
