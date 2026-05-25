<template>
  <div class="chart-container" :class="{ fullscreen: expandido }">
    <apexchart width="100%" height="100%" type="line" :options="options" :series="series"></apexchart>
  </div>
</template>

<script lang="ts" setup>
//Vue
import { ref, computed } from 'vue';

//ApexCharts
import type { ApexOptions } from 'apexcharts';
import apexchart from 'vue3-apexcharts';

//Classes
import CDatasetGraficoColunaLinhaArea from './CDatasetGraficoColunaLinhaArea';

const props = defineProps<{
  expandido?: boolean;
  dataSet: CDatasetGraficoColunaLinhaArea<any>;
}>();

const options = computed<ApexOptions>(() => {
  const lOptions: ApexOptions = {
    chart: {
      id: 'vuechart-example',
    },
    colors: ['#755640', '#A0522D', '#CD853F'],
    stroke: {
      width: [0, 2, 5],
      curve: 'smooth',
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
      },
    },

    fill: {
      opacity: [0.85, 0.25, 1],
      gradient: {
        inverseColors: false,
        shade: 'light',
        type: 'vertical',
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100],
      },
    },
    labels: lLabels.value,
    markers: {
      size: 0,
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      title: {
        text: 'Points',
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== 'undefined') {
            return y.toFixed(0) + ' points';
          }
          return y;
        },
      },
    },
  };
  return lOptions;
});

const lLabels = computed(() => props.dataSet.campoLabel as any[]);

const lDados = [] as any[];
for (const registro of props.dataSet.registros) {
  lDados.push({
    titulo: String(registro[props.dataSet.campos.campoTitulo as any]),
    tipo: String(registro[props.dataSet.campos.campoTipo as any]),
    valor: registro[props.dataSet.campos.campoValor as any],
  });
}
const series = computed(() =>
  lDados.map((item: any) => ({
    name: item.titulo,
    type: item.tipo,
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
