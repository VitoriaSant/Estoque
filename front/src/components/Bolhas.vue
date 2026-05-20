<template>
  <div class="chart-container" :class="{ fullscreen: expandido }">
    <apexchart width="100%" height="100%" type="bubble" :options="options" :series="series" />
  </div>
</template>

<script setup lang="ts">
//Vue
import { ref } from 'vue';

//ApexCharts
import VueApexCharts from 'vue3-apexcharts';

defineProps<{
  expandido?: boolean;
}>();

const apexchart = VueApexCharts;

// Função para gerar dados para o gráfico de bolhas
function generateData(baseval: number, count: number, yrange: { min: number; max: number }) {
  let i = 0;
  const series = [];
  while (i < count) {
    const x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
    const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    const z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

    series.push([x, y, z]);
    baseval += 86400000;
    i++;
  }
  return series;
}

const options = ref({
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
    type: 'category' as const,
  },
  yaxis: {
    max: 70,
  },
});

const series = ref([
  {
    name: 'PRODUTOS 1',
    data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
      min: 10,
      max: 60,
    }),
  },
  {
    name: 'PRODUTOS 2',
    data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
      min: 10,
      max: 60,
    }),
  },
  {
    name: 'PRODUTOS 3',
    data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
      min: 10,
      max: 60,
    }),
  },
  {
    name: 'PRODUTOS 4',
    data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
      min: 10,
      max: 60,
    }),
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
