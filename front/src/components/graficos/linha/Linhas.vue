<template>
  <div class="chart-container" :class="{ fullscreen: expandido }">
    <apexchart width="100%" height="100%" type="line" :options="options" :series="series" />
  </div>
</template>

<script lang="ts" setup>
//Vue
import { ref, computed } from 'vue';

//ApexCharts
import VueApexCharts from 'vue3-apexcharts';
import type { ApexOptions } from 'apexcharts';

//Classes
import CDatasetGraficoLinha from './CDatasetGraficoLinha';

const props = defineProps<{
  expandido?: boolean;
  dataSet: CDatasetGraficoLinha<any>;
}>();

const apexchart = VueApexCharts;

const options = computed<ApexOptions>(() => {
  const lOptions: ApexOptions = {
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
      categories: lLabels.value,
    },
  };
  return lOptions;
});

const lLabels = computed(() => props.dataSet.campoLabel as any[]);

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
