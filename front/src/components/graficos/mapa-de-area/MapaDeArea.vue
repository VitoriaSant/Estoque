<template>
  <div class="chart-container" :class="{ fullscreen: expandido }">
    <apexchart width="100%" height="100%" type="treemap" :options="options" :series="series" />
  </div>
</template>

<script lang="ts" setup>
//Vue
import { computed } from 'vue';

//ApexCharts
import VueApexCharts from 'vue3-apexcharts';
import type { ApexOptions } from 'apexcharts';

//Classes
import CDatasetGraficoMapaDeArea from './CDataSetGraficoMapaDeArea';

const props = defineProps<{
  expandido?: boolean;
  dataSet: CDatasetGraficoMapaDeArea<any>;
}>();

const apexchart = VueApexCharts;

const options = computed<ApexOptions>(() => {
  const lOptions: ApexOptions = {
    chart: {
      id: 'vuechart-example',
    },
    colors: ['#755640', '#8B6F5B', '#A18A73', '#B8A58B', '#D0C0A5', '#E8DBCA', '#FFF5F0'],
    legend: {
      show: false,
    },
  };
  return lOptions;
});

const lDados = [] as any[];
for (const registro of props.dataSet.registros) {
  lDados.push({
    titulo: String(registro[props.dataSet.campoTitulo as any]),
    valor: registro[props.dataSet.campoValor as any],
  });
}
const series = computed(() => {
  return [
    {
      data: lDados.map((item: any) => ({
        x: item.titulo,
        y: item.valor,
      })),
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
