<template>
  <div class="chart-container" :class="{ fullscreen: expandido }">
    <apexchart width="100%" height="100%" type="polarArea" :options="options" :series="series" />
  </div>
</template>

<script setup lang="ts">
//Vue
import { ref, computed } from 'vue';

//ApexCharts
import VueApexCharts from 'vue3-apexcharts';
import type { ApexOptions } from 'apexcharts';

//Classes
import CDatasetGraficoAreaPolar from './graficos/area-polar/CDatasetGraficoAreaPolar';

const props = defineProps<{
  expandido?: boolean;
  dataSet: CDatasetGraficoAreaPolar<any>;
}>();

const apexchart = VueApexCharts;

const options = computed<ApexOptions>(() => {
  const lOptions: ApexOptions = {
    chart: {
      type: 'polarArea' as any,
      toolbar: {
        show: true,
        tools: {
          download: true,
        },
      },
    },
    colors: ['#755640', '#8B6F5B', '#A18A73', '#B8A58B', '#D0C0A5'],
    labels: lLabels,
    fill: {
      opacity: 1,
    },
    yaxis: {
      show: false,
    },
    legend: {
      position: 'bottom' as const,
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 0,
        },
        spokes: {
          strokeWidth: 0,
        },
      },
    },
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
