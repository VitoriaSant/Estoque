<template>
  <div class="chart-container" :class="{ fullscreen: expandido }">
    <apexchart width="100%" height="100%" type="donut" :options="options" :series="series" />
  </div>
</template>

<script lang="ts" setup>
//Vue
import { ref, computed } from 'vue';

//ApexCharts
import type { ApexOptions } from 'apexcharts';
import VueApexCharts from 'vue3-apexcharts';

//Classes
import CDatasetGraficoDonuts from './CDatasetGraficoDonuts';

const props = defineProps<{
  expandido?: boolean;
  dataSet: CDatasetGraficoDonuts<any>;
}>();

const apexchart = VueApexCharts;

const options = computed<ApexOptions>(() => {
  const lOptions: ApexOptions = {
    chart: {
      id: 'vuechart-example',
      toolbar: {
        show: true,
        tools: {
          download: true,
        },
      },
    },
    colors: ['#755640', '#8B6F5B', '#A18A73', '#B8A58B'],
    labels: lLabels,
  };
  return lOptions;
});
const series = computed(() => {
  return lDados;
});

const lDados = [] as any[];
for (const registro of props.dataSet.registros) {
  lDados.push(registro[props.dataSet.campoValor]);
}

const lLabels = [] as any[];
for (const registro of props.dataSet.registros) {
  lLabels.push(registro[props.dataSet.campoLabel]);
}
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
