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
    plotOptions: {
      bar: {
        horizontal: true,
      },
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
