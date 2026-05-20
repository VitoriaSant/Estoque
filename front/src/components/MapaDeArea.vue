<template>
  <div class="chart-container" :class="{ fullscreen: expandido }">
    <apexchart width="100%" height="100%" type="treemap" :options="options" :series="series" />
  </div>
</template>

<script lang="ts" setup>
//Vue
import { ref } from 'vue';

//ApexCharts
import VueApexCharts from 'vue3-apexcharts';

defineProps<{
  expandido?: boolean;
}>();

const apexchart = VueApexCharts;

const options = ref({
  colors: ['#755640', '#8B6F5B', '#A18A73', '#B8A58B', '#D0C0A5', '#E8DBCA', '#FFF5F0'],
  legend: {
    show: false,
  },
});
const series = ref([
  {
    data: [
      {
        x: 'PRODUTO A',
        y: 218,
      },
      {
        x: 'PRODUTO B',
        y: 149,
      },
      {
        x: 'PRODUTO C',
        y: 184,
      },
      {
        x: 'PRODUTO D',
        y: 55,
      },
      {
        x: 'PRODUTO E',
        y: 84,
      },
      {
        x: 'PRODUTO F',
        y: 31,
      },
      {
        x: 'PRODUTO G',
        y: 70,
      },
    ],
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
