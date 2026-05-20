<template>
  <div class="chart-container" :class="{ fullscreen: expandido }">
    <apexchart width="100%" height="100%" type="bar" :options="options" :series="series" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

interface Props {
  expandido?: boolean;
  dados?: Array<{
    mes: string;
    ano: number;
    total: number;
  }>;
}

const props = withDefaults(defineProps<Props>(), {
  expandido: false,
  dados: () => [],
});

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
