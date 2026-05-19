<template>
  <div class="chart-container" :class="{ fullscreen: expandido }">
    <apexchart width="100%" height="100%" type="line" :options="options" :series="series" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

defineProps<{
  expandido?: boolean;
}>();

const apexchart = VueApexCharts;

const options = ref({
  chart: {
    id: 'vuechart-example',
  },
  colors: ['#755640'],
  stroke: {
    width: 3,
    curve: 'straight' as const,
  },
  markers: {
    size: 6,
    colors: ['#5a4031', '#8b6b5a', '#a88a75'],
    strokeColors: '#fff',
    strokeWidth: 2,
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
});

const series = ref([
  {
    name: 'PRODUTO A',
    data: [30, 40, 45, 50, 49, 60, 70, 91],
  },
  {
    name: 'PRODUTO B',
    data: [20, 30, 35, 40, 39, 50, 60, 81],
  },
  {
    name: 'PRODUTO C',
    data: [10, 20, 25, 30, 29, 40, 50, 71],
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
