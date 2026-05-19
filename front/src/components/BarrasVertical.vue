<template>
  <div class="chart-container" :class="{ fullscreen: expandido }">
    <apexchart width="100%" height="100%" type="bar" :options="options" :series="series" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const props = defineProps<{
  expandido?: boolean;
  dados?: Array<{
    mes: string;
    ano: number;
    total: number;
  }>;
}>();

const apexchart = VueApexCharts;

const options = computed(() => ({
  chart: {
    id: 'vuechart-example',
  },
  colors: ['#755640'],
  xaxis: {
    categories: props.dados?.map((item) => `${item.mes}/${item.ano}`) || [],
  },
}));

const series = computed(() => [
  {
    name: 'Consumo',
    data: props.dados?.map((item) => item.total) || [],
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
