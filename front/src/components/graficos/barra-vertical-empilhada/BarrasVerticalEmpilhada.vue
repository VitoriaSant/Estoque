<template>
  <div class="chart-container" :class="{ fullscreen: expandido }">
    <apexchart width="100%" height="100%" type="bar" :options="options" :series="series" />
  </div>
  {{ lDados }}
</template>

<script setup lang="ts">
//Vue
import { ref, computed } from 'vue';

//ApexCharts
import VueApexCharts from 'vue3-apexcharts';
import type { ApexOptions } from 'apexcharts';

//Classes
import CDatasetGraficoBarraVerticalEmpilhada, {
  CGraficoBarraVerticalEmpilhada,
} from './CDatasetGraficoBarraVerticalempilhads';

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
    titulo: registro.titulo ?? registro.name ?? '',
    valor: registro.valor ?? registro.data ?? [],
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
