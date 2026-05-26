<template>
  <div class="chart-container" :class="{ fullscreen: expandido }">
    <apexchart width="100%" height="100%" type="bubble" :options="options" :series="series" />
  </div>
</template>

<script setup lang="ts">
//Vue
import { ref, computed } from 'vue';

//ApexCharts
import VueApexCharts from 'vue3-apexcharts';
import type { ApexOptions } from 'apexcharts';

//classes
import CDatasetGraficoBolha from './CDatasetGraficoBolha';

const props = defineProps<{
  expandido?: boolean;
  dataSet: CDatasetGraficoBolha<any>;
}>();

const apexchart = VueApexCharts;

const options = computed<ApexOptions>(() => {
  const lOptions: ApexOptions = {
    chart: {
      id: 'vuechart-example',
      height: 350,
      type: 'bubble' as const,
    },
    colors: ['#755640', '#8B4513', '#A0522D', '#CD853F'],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 0.8,
    },
    xaxis: {
      tickAmount: 12,
      type: 'numeric' as const,
    },
    yaxis: {
      max: 70,
    },
  };
  console.log('options', lDados);
  return lOptions;
});

const lDados = props.dataSet.registros.map((registro) => ({
  name: String(registro[props.dataSet.campoLabel]),
  data: registro[props.dataSet.campoValor] as any[],
}));

const series = computed(() => lDados);
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
