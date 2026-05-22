<template>
  <div class="chart-container" :class="{ fullscreen: expandido }">
    <apexchart width="100%" height="100%" type="bar" :options="options" :series="series" />
  </div>
</template>

<script setup lang="ts">
//Vue
import { computed } from 'vue';

//ApexCharts
import VueApexCharts from 'vue3-apexcharts';
import type { ApexOptions } from 'apexcharts';

//Classes
import CDatasetGraficoBarraVerticalEmpilhada from './CDatasetGraficoBarraVerticalempilhado';

const props = defineProps<{
  expandido?: boolean;
  dataSet: CDatasetGraficoBarraVerticalEmpilhada<any>;
}>();

const apexchart = VueApexCharts;

const lLabels = computed(() => props.dataSet.campoLabel as any[]);

const options = computed<ApexOptions>(() => {
  const lOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      stackType: '100%',
    },
    colors: ['#5a4031', '#8b6b5a', '#a88a75'],
    xaxis: {
      categories: lLabels.value,
    },
  };

  return lOptions;
});

const lDados = [] as any[];
for (const registro of props.dataSet.registros) {
  lDados.push({
    titulo: String(registro[props.dataSet.campos.campoTitulo as any]),
    valor: registro[props.dataSet.campos.campoValor as any],
  });
}

const series = computed(() =>
  lDados.map((item: any) => ({
    name: item.titulo,
    data: item.valor,
  })),
);
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
