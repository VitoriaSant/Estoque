<template>
  <div class="chart-container" :class="{ fullscreen: expandido }">
    <apexchart width="100%" height="100%" type="bar" :options="options" :series="series" />
  </div>
</template>

<script setup lang="ts">
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
  plotOptions: {
    bar: {
      horizontal: true,
    },
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
